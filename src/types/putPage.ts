interface IInputBase<T> {
  label: string;
  value: T;
  onChangeValue: (value: T) => void;
  icon: JSX.Element;
  type: string;
}

interface ITextInput extends IInputBase<string> {
  type: "text";
}

interface INumberInput extends IInputBase<number | undefined> {
  type: "number";
}

interface INumberIntegerInput extends IInputBase<number | undefined> {
  type: "number-integer";
}

interface ISelectInput extends IInputBase<{ id: string; name: string }[]> {
  type: "select";
  options: { id: string; name: string }[];
}

export type InputField =
  | ITextInput
  | INumberInput
  | INumberIntegerInput
  | ISelectInput;
