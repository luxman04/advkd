import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <span className="font-serif text-gold text-6xl mb-4">404</span>
      <h1 className="font-serif text-navy text-2xl mb-3">Page Not Found</h1>
      <p className="text-muted font-light mb-8 max-w-[420px]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
