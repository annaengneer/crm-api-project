export default function Input({
    value,
    onChange,
    placeholder,
    type = "text",
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
  }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
      />
    );
  }