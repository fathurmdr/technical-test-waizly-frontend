import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}
export default function TextInput({
  id,
  label,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className="mb-4.5">
      {label && (
        <label
          htmlFor={id}
          className="mb-2.5 flex items-center text-black dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={`${className} w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-graydark`}
      />
    </div>
  );
}
