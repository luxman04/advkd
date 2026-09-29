import type { PortableTextBlock } from 'sanity';

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function parseSpans(text: string) {
  // Support **bold** markdown within lines
  const regex = /(\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);
  return parts.filter(Boolean).map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return {
        _type: 'span' as const,
        _key: randomKey(),
        text: part.slice(2, -2),
        marks: ['strong'],
      };
    }
    return {
      _type: 'span' as const,
      _key: randomKey(),
      text: part,
      marks: [],
    };
  });
}

export function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split(/\r?\n/);
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: randomKey(),
          style: 'normal',
          markDefs: [],
          children: parseSpans(text),
        } as PortableTextBlock);
      }
      currentParagraph = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h3',
        markDefs: [],
        children: parseSpans(line.slice(4).trim()),
      } as PortableTextBlock);
    } else if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h2',
        markDefs: [],
        children: parseSpans(line.slice(3).trim()),
      } as PortableTextBlock);
    } else if (line.startsWith('# ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'h2',
        markDefs: [],
        children: parseSpans(line.slice(2).trim()),
      } as PortableTextBlock);
    } else if (line.startsWith('> ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'blockquote',
        markDefs: [],
        children: parseSpans(line.slice(2).trim()),
      } as PortableTextBlock);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        listItem: 'bullet',
        markDefs: [],
        children: parseSpans(line.slice(2).trim()),
      } as PortableTextBlock);
    } else if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        listItem: 'number',
        markDefs: [],
        children: parseSpans(line.replace(/^\d+\.\s/, '').trim()),
      } as PortableTextBlock);
    } else {
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  return blocks;
}

export function portableTextToMarkdown(blocks?: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block') return '';
      const text = (block.children || [])
        .map((c: any) => {
          if (c.marks?.includes('strong')) return `**${c.text || ''}**`;
          return c.text || '';
        })
        .join('');

      if (block.style === 'h2') return `## ${text}\n`;
      if (block.style === 'h3') return `### ${text}\n`;
      if (block.style === 'blockquote') return `> ${text}\n`;
      if (block.listItem === 'bullet') return `- ${text}`;
      if (block.listItem === 'number') return `1. ${text}`;
      return `${text}\n`;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
