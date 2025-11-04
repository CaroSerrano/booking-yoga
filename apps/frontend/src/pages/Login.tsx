import { LoginForm } from '../components/LoginForm';
import type { LoginFormProps } from '../components/LoginForm';

export function Login({
  onSubmit,
  defaultValues,
  loading,
  showPassword,
}: LoginFormProps) {
  return (
    <article className='flex flex-col items-center'>
      <LoginForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        loading={loading}
        showPassword={showPassword}
      />
    </article>
  );
}
