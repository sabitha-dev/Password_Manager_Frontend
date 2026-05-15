type Props = {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  type = "button",
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md disabled:opacity-50"
    >
      {text}
    </button>
  );
}