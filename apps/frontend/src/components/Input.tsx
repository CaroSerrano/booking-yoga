type InputTypes = 'text' | 'password' | 'email' | 'checkbox';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: InputTypes;
  id: string;
  flexCol?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  id,
  flexCol = true,
  value,
  name,
  onChange,
}: InputProps) {
  const layout = flexCol ? 'flex flex-col-reverse' : 'flex';
  return (
    <div className={`${layout} gap-2`}>
      <input
        id={id}
        className='rounded-md text-sm border border-white py-1 px-2'
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
