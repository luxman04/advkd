import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      console.error('SANITY_REVALIDATE_SECRET is not set — see README "Publishing & instant updates" section.');
      return NextResponse.json({ message: 'Revalidation secret not configured on the server.' }, { status: 500 });
    }

    // waitForContentLakeEvent=true because our read client uses useCdn: true — this avoids
    // revalidating a fraction of a second before Sanity's CDN has caught up with the edit.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Missing document type in payload.' }, { status: 400 });
    }

    revalidateTag('posts');
    if (body.slug?.current) {
      revalidateTag(`post:${body.slug.current}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), slug: body.slug?.current ?? null });
  } catch (err) {
    console.error('Sanity revalidate webhook error:', err);
    // Non-2xx tells Sanity to retry the webhook (up to 5 attempts) rather than silently drop it.
    return NextResponse.json({ message: 'Unexpected error while revalidating.' }, { status: 500 });
  }
}
