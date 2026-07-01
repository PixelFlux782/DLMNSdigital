import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "surface-panel rounded-2xl p-6",
        hover &&
          "transition-all duration-500 hover:border-border-strong hover:shadow-[var(--shadow-depth)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
