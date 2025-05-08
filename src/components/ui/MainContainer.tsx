import { cn } from '@/lib/utils';

export function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <div className={cn('mx-auto max-w-6xl px-4 py-8', className)}>{children}</div>
    </main>
  );
}
