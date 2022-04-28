/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: { value: any }) => {
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
