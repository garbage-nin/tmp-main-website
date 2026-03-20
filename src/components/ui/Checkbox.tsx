interface CheckboxProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  error?: string;
}

export default function Checkbox({
  id,
  label,
  description,
  checked,
  onChange,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 rounded border-slate-400 accent-primary shrink-0"
        />
        <div>
          <span className="text-sm text-slate-700">{label}</span>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      </label>
      {error && <p className="mt-1 text-xs text-red-500 ml-7">{error}</p>}
    </div>
  );
}
