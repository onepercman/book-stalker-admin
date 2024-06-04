import { Checkbox, CheckboxProps } from "./checkbox"
import { InputFieldProps, InputProps, Input as InternalInput } from "./input"
import { NumberInput } from "./number-input"
import { Radio, RadioProps } from "./radio"
import { Range } from "./range"
import { Switch } from "./switch"
import { Textarea, TextareaProps } from "./textarea"

interface Input
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  > {
  Number: typeof NumberInput
  Textarea: typeof Textarea
  Checkbox: typeof Checkbox
  Radio: typeof Radio
  Range: typeof Range
  Switch: typeof Switch
}
const Input = InternalInput as Input

export { Input }
export type {
  CheckboxProps,
  InputFieldProps,
  InputProps,
  RadioProps,
  TextareaProps,
}

Input.Number = NumberInput
Input.Textarea = Textarea
Input.Checkbox = Checkbox
Input.Radio = Radio
Input.Range = Range
Input.Switch = Switch
