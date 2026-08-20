import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  /** File name shown if the image is missing, so the slot stays obvious. */
  label: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * Renders the photo when it exists in /public, and a labelled slot of the exact
 * same size when it does not — so files can be swapped without touching layout.
 */
export default function ImagePlaceholder({ src, alt, label, className = '', loading = 'lazy' }: Props) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center border border-hair bg-surface ${className}`}
      >
        <span className="px-6 text-center">
          <span className="block font-display text-xl text-fg/60">{label}</span>
          <span className="mt-2 block text-[10px] uppercase tracking-[0.3em] text-muted">
            Drop this file into /public
          </span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setMissing(true)}
      className={className}
    />
  );
}
