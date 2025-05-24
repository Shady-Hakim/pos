// helpers.ts
import { Dispatch, SetStateAction } from 'react';
import { addToCart } from '@/store/cartSlice';
import { AppDispatch } from '@/store';
import { Product } from '@/app/mocks/productsMock';

export function handleQuantityChange(
  id: string,
  quantity: number,
  setLocalQuantities: Dispatch<SetStateAction<Record<string, number>>>
) {
  if (quantity < 1) return;
  setLocalQuantities((prev) => ({
    ...prev,
    [id]: quantity,
  }));
}

export function handleAddToCart(
  dispatch: AppDispatch,
  product: Product,
  localQuantities: Record<string, number>,
  selectedSize: string
) {
  const quantity = localQuantities[product.id] ?? 1;
  dispatch(addToCart({ ...product, quantity, selectedSize }));
}
