import React from 'react';

import {
  Avatar as AvatarPrimitive,
  AvatarFallback,
  AvatarImage,
} from '@Components/radix/avatar';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
}
const Avatar = ({ src, alt, fallback, className }: AvatarProps) => {
  return (
    <AvatarPrimitive className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarPrimitive>
  );
};

export default Avatar;
