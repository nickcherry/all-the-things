function cleanUpFormattedAddress({ address }: { address: string }) {
  return address.replace(', United States', '').replace(', USA', '');
}

export { cleanUpFormattedAddress };
