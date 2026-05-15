type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder:string
};

export default function Input({ label, type = "text", value, onChange ,placeholder}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}