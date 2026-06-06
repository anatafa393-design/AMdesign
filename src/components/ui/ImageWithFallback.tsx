"use client";

import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  style?: React.CSSProperties;
};

export default function ImageWithFallback({ src, alt, className = '', width, height, fallbackSrc, style }: Props) {
  const [error, setError] = useState(false);
  const finalSrc = error ? (fallbackSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23111"%3E%3Crect width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-size="14" font-family="sans-serif"%3EImage unavailable%3C/text%3E%3C/svg%3E') : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
