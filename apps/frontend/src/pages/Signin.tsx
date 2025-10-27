import { SigninForm } from '../components/SigninForm';
import type { SigninFormProps } from '../components/SigninForm';

export function Signin({
  onSubmit,
  error,
  loading,
  showPassword,
  successMessage,
}: SigninFormProps) {
  return (
    <article className='flex flex-col items-center'>
      <SigninForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        showPassword={showPassword}
        successMessage={successMessage}
      />
    </article>
  );
}
