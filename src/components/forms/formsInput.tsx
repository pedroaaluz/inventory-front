import React, { ChangeEvent } from "react";

export interface CustomFormsInputProps {
  value: string;
  onChange: (
    value: ChangeEvent<HTMLInputElement>
  ) => React.SetStateAction<void>;
  autoComplete?: string;
  required: boolean;
  type: string;
  name?: string;
  id: string;
  label: string;
  auxLink?: string;
}

export default function CustomFormsInput({
  value,
  onChange,
  autoComplete,
  required,
  type = "text",
  name,
  id,
  label,
  auxLink,
}: CustomFormsInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {auxLink && (
          <div className="text-sm">
            <a
              href="/reset-password"
              className="font-semibold text-[#008A91] hover:text-[#00777d]"
            >
              Esqueceu a senha?
            </a>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
