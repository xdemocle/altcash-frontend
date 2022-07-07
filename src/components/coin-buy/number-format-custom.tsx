import NumberFormat from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef?: (instance: NumberFormat<number> | null) => void;
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
    <NumberFormat
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
      isNumericString
    />
  );
};

export default NumberFormatCustom;
