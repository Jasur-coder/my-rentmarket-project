declare module 'react-input-mask' {
  import { InputHTMLAttributes } from 'react';

  interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    beforeMaskedValueChange?: (newState: any, oldState: any, userInput: string, mask: string) => any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  const InputMask: React.ForwardRefExoticComponent<InputMaskProps & React.RefAttributes<HTMLInputElement>>;
  
  export default InputMask;
}
