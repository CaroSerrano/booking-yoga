type InputTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'checkbox'
  | 'datetime-local'
  | 'number';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: InputTypes;
  id: string;
  flexCol?: boolean;
  value?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  step?: string;
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
  disabled = false,
  required = true,
  step = '1',
  onChange,
}: InputProps) {
  const layout = flexCol ? 'flex flex-col-reverse' : 'flex';
  return (
    <div className={`${layout} w-full gap-2`}>
      <input
        id={id}
        className='w-full rounded-md text-sm border-2 border-white py-1 px-2 disabled:bg-gray-400'
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
        step={step}
      />
      <label className='font-bold' htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
