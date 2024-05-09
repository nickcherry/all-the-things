function getSelectedOption<
  Label extends string,
  Value extends string | number,
  Option extends { label: Label; value: Value },
>({
  fallbackIndex,
  options,
  selectedValue,
}: {
  fallbackIndex: number;
  options: Option[];
  selectedValue: Value;
}): Option {
  return (
    options.find(({ value }) => value === selectedValue) ||
    options[fallbackIndex]
  );
}

export { getSelectedOption };
