import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
  children?: ReactNode;
}

export function Section({ className, container = true, children, ...props }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={cn("py-16 md:py-24", className)}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.section>)}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}
