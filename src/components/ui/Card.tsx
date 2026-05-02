import { HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl overflow-hidden",
        hoverEffect && "hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 flex items-center mt-auto", className)} {...props}>
      {children}
    </div>
  );
}
