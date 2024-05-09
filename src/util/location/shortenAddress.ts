function shortenAddress({ address }: { address: string }) {
  const parts = address.split(', ');

  if (parts.length !== 3) {
    return address;
  }

  return parts[0];
}

export { shortenAddress };
