interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-8 py-3 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary:
      "bg-white text-primary border-2 border-primary hover:bg-slate-50 focus:ring-primary",
    accent:
      "bg-accent text-white hover:bg-accent-dark focus:ring-accent",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
