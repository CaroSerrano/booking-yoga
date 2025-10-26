import type { PropsWithChildren } from 'react';

export type ButtonVariant = 'primary' | 'danger' | 'disabled' | 'loading';

export type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
}>;

export function Button({ variant, children, onClick, className }: ButtonProps) {
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-[var(--color-lavender-500)] hover:bg-[var(--color-lavender-700)] cursor-pointer text-white';
      break;
    case 'danger':
      variantClasses = 'bg-red-800 hover:bg-red-900 cursor-pointer text-white';
      break;
    case 'disabled':
      variantClasses =
        'bg-[var(--color-lavender-600)] text-gray-400 cursor-not-allowed';
      break;
    case 'loading':
      variantClasses =
        'bg-[var(--color-lavender-500)] cursor-not-allowed text-white';
      break;
    default:
      variantClasses =
        'bg-cyan-900 hover:bg-cyan-950 cursor-pointer text-white';
      break;
  }
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center justify-center text-center gap-2 rounded-xl px-5 py-1 ${className} ${variantClasses} transition-colors`}
    >
      {children}
    </button>
  );
}
