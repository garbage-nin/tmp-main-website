interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  required,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
          error ? "border-red-500" : "border-slate-300"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
