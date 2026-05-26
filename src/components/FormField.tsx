interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function FormField({ label, name, type = "text", placeholder, value, onChange, required }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
        {label}
      </label>
      <input
        id={name}
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-gray-400 transition-colors"
      />
    </div>
  );
}
