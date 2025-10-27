export function Spinner({ size = 24, className = 'text-white' }) {
  const radius = size / 2 - 2;
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        className='opacity-25'
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='currentColor'
        strokeWidth={size / 12}
      />
      <circle
        className='opacity-75'
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='currentColor'
        strokeWidth={size / 12}
        strokeDasharray={Math.PI * radius}
        strokeLinecap='round'
      />
    </svg>
  );
}
