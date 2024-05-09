function getColorWithAlpha(color: string, alpha: number) {
  const decimal = `0${Math.round(255 * alpha).toString(16)}`
    .slice(-2)
    .toUpperCase();
  return color + decimal;
}

export { getColorWithAlpha };
