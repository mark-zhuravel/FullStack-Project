interface InputFieldProps {
  label: string;
  type?: string;
  error?: string;
  register: any;
  name: string;
  required?: boolean;
}

const InputField = ({ label, type = "text", error, register, name, required }: InputFieldProps) => (
  <div className="ml-8 mr-12 mb-2">
    <label className="block mb-3 text-[15px] text-[#E6E6E6] font-medium leading-[150%]">
      {label}
    </label>
    <input
      type={type}
      {...register(name, { required })}
      className="w-full h-[53px] border px-6 py-4 opacity-[0.64] text-[#E6E6E6] rounded-[3px] font-medium bg-transparent border-white/40"
      style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;