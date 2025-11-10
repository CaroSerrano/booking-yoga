import { Link } from 'react-router-dom';

export interface PaymentSuccessProps {
  email: string | undefined;
}

export default function PaymentSuccess({
  email,
}: PaymentSuccessProps) {
  return (
    <article className='flex flex-col items-center gap-5 px-8 text-center'>
      <p>Thank you for your reservation!</p>
      <p>
        We have sent you an email to <span className='font-bold'>{email}</span>{' '}
        with the details.
      </p>
      <p>
        If you need to cancel it, you can do so from the same email or from the{' '}
        <Link
          className='text-blue-400 underline hover:text-blue-500'
          to={'/calendar'}
        >
          calendar
        </Link>
        .{' '}
      </p>
    </article>
  );
}
