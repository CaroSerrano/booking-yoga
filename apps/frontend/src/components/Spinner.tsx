export function Spinner({ className = 'w-5 h-5 text-white' }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <circle
        className='opacity-75'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
        strokeDasharray='31.4'
        strokeDashoffset='0'
        strokeLinecap='round'
      />
    </svg>
  );
}
