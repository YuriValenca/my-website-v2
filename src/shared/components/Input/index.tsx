import { InputWrapper, InputContainer, InputField, ErrorMessage } from "./style";

interface InputProps {
  placeholder?: string;
  value: string | number;
  error?: boolean;
  errorMessage?: string;
  logo?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  value,
  error,
  errorMessage,
  logo,
  onChange,
  onKeyDown,
}: InputProps) => {
  return (
    <InputWrapper>
      <InputContainer error={error}>
        {/* {logo && <InputLogo src={logo} alt="" />} */}
        <InputField
          name="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
