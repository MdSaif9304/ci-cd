export const TextInput = ({
  placeholder,
  label,
  onChange,
}: {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="w-full pt-2">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
      onChange={(e)=> {
        onChange(e.target.value)
      }}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
