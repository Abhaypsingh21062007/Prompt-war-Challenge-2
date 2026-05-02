import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  children?: ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer";
  
  const variants: Record<string, string> = {
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 shadow-md shadow-blue-900/20 dark:shadow-blue-900/40",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:brightness-110 shadow-md shadow-orange-900/20",
    accent: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110 shadow-md shadow-green-900/20",
    glass: "bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--glass-highlight)] shadow-sm",
    outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]",
    ghost: "hover:bg-[var(--foreground)]/5 text-[var(--foreground)]",
  };

  const sizes: Record<string, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
}
