import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'accent' | 'glass' | 'ghost';
  wrapperClassName?: string;
}

export function IconWrapper({
  icon: Icon,
  size = 'md',
  variant = 'primary',
  className,
  wrapperClassName,
  ...props
}: IconProps) {
  const wrapperSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  };

  const variants = {
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    secondary: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    accent: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    glass: "glass text-[var(--foreground)]",
    ghost: "bg-transparent text-[var(--foreground)]",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl transition-colors",
        wrapperSizes[size],
        variants[variant],
        wrapperClassName
      )}
    >
      <Icon
        size={iconSizes[size]}
        className={className}
        {...props}
      />
    </div>
  );
}
