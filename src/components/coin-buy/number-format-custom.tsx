import NumberFormat from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat<number> | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = ({
  inputRef,
  onChange,
  name,
  ...other
}: NumberFormatCustomProps) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
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
