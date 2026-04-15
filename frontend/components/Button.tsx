export default function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
      >
        {children}
      </button>
    );
  }