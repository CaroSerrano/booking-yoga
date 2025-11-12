import { SigninForm } from '../components/SigninForm';
import type { SigninFormProps } from '../components/SigninForm';

export function Signin({
  onSubmit,
  loading,
  showPassword
}: SigninFormProps) {
  return (
    <article className='flex flex-col items-center'>
      <SigninForm
        onSubmit={onSubmit}
        loading={loading}
        showPassword={showPassword}
      />
    </article>
  );
}
