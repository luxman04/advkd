import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0D1B2A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ color: '#B8902A', fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}>
          Chandigarh &bull; Delhi NCR &bull; High Courts
        </div>
        <div style={{ color: '#fff', fontSize: 64, lineHeight: 1.15, maxWidth: 900 }}>{siteConfig.name}</div>
        <div style={{ color: '#9BA6B2', fontSize: 26, marginTop: 24, maxWidth: 800 }}>
          Advocate in Chandigarh &amp; Delhi | Criminal, Civil &amp; NRI Matters
        </div>
      </div>
    ),
    { ...size }
  );
}
