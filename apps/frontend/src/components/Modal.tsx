import { useEffect, useRef, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { LuX } from 'react-icons/lu';

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-black/90 z-50'>
      <div
        ref={modalRef}
        className='bg-[url("/texture.webp")] bg-cover bg-center rounded-2xl shadow-lg w-full max-w-lg max-h-screen overflow-y-auto p-6 relative'
      >
        <button
          onClick={onClose}
          title='close modal'
          className='absolute right-3 top-3 text-gray-700 hover:text-gray-900 cursor-pointer'
        >
          <LuX size={24} />
        </button>
        {title && (
          <h2
            id='title'
            className='text-xl text-(--color-lavender-700) text-center font-bold mb-4'
          >
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
