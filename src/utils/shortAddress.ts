
export const shortAddress = (address: string, start: number, end: number) => `${address.slice(0, start)}...${address.slice(0 - end)}`;
