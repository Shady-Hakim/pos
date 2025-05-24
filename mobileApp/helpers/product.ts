export const incrementQuantity = (quantity: number): number => quantity + 1;

export const decrementQuantity = (quantity: number): number => {
  if (quantity > 1) {
    return quantity - 1;
  }
  return 0;
};

export const parseQuantityInput = (text: string): number | null => {
  const num = parseInt(text, 10);
  if (!isNaN(num) && num >= 0) {
    return num;
  }
  return null;
};
