import { LoginForm } from '../components/LoginForm';
import type { LoginFormProps } from '../components/LoginForm';

export function Login({
  onSubmit,
  defaultValues,
  error,
  loading,
  showPassword,
  successMessage,
}: LoginFormProps) {
  return (
    <article className='flex flex-col items-center'>
      <LoginForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        error={error}
        loading={loading}
        showPassword={showPassword}
        successMessage={successMessage}
      />
    </article>
  );
}
