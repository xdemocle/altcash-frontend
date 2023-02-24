import { NumericFormat } from 'react-number-format';

interface NumberFormatCustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: any;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: number;
  decimalScale?: number;
  displayType?: 'input' | 'text';
}

const NumberFormatCustom = ({
  inputRef,
  onChange,
  name,
  value,
  displayType = 'input',
  decimalScale = 10,
  ...other
}: NumberFormatCustomProps) => {
  return (
    <NumericFormat
      {...other}
      value={value}
      displayType={displayType}
      getInputRef={inputRef}
      decimalScale={decimalScale}
      onValueChange={(values: { value: string }) => {
        onChange({
          target: {
            name: name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
};

export default NumberFormatCustom;
