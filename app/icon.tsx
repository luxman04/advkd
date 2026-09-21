import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0D1B2A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#B8902A',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
        }}
      >
        KD
      </div>
    ),
    { ...size }
  );
}
