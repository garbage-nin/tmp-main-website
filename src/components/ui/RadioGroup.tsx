interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </legend>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer text-sm text-slate-700"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 text-primary accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </fieldset>
  );
}
