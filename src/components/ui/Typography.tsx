import { cn } from '@/utils/cn';
import { HTMLAttributes, ElementType } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'lead';
  gradient?: boolean;
  as?: ElementType;
}

const variantTagMap: Record<string, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  lead: 'p',
  body: 'p',
  caption: 'span',
};

const variantStyles: Record<string, string> = {
  h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight",
  h2: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl font-bold tracking-tight",
  h4: "text-xl sm:text-2xl font-semibold tracking-tight",
  lead: "text-lg sm:text-xl text-[var(--foreground)]/80 leading-relaxed",
  body: "text-base text-[var(--foreground)]/80 leading-relaxed",
  caption: "text-sm text-[var(--foreground)]/60 font-medium",
};

export function Typography({
  className,
  variant = 'body',
  gradient = false,
  as,
  children,
  ...props
}: TypographyProps) {
  const Component = as || variantTagMap[variant] || 'p';

  return (
    <Component
      className={cn(
        variantStyles[variant],
        gradient && "text-gradient",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
