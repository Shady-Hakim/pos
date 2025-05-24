import { Alert } from 'react-native';
import { AppDispatch } from '@/store';
import { updateQuantity, removeFromCart, clearCart } from '@/store/cartSlice';

export function increment(
  dispatch: AppDispatch,
  id: string,
  currentQuantity: number
) {
  dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
}

export function decrement(
  dispatch: AppDispatch,
  id: string,
  currentQuantity: number
) {
  if (currentQuantity <= 1) {
    Alert.alert('Remove item', 'Do you want to remove this item from cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', onPress: () => dispatch(removeFromCart(id)) },
    ]);
  } else {
    dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
  }
}

export function confirmRemove(dispatch: AppDispatch, id: string) {
  Alert.alert('Remove item', 'Are you sure?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Remove', onPress: () => dispatch(removeFromCart(id)) },
  ]);
}

export function confirmClearCart(dispatch: AppDispatch) {
  Alert.alert('Clear Cart', 'Are you sure you want to clear the cart?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Clear', onPress: () => dispatch(clearCart()) },
  ]);
}

type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
};

type SubmitOrderFn = (orderPayload: any) => Promise<any>;

export const handleCheckout = async (
  cartItems: CartItem[],
  totalPrice: number,
  submitOrder: SubmitOrderFn,
  dispatch: AppDispatch
) => {
  if (cartItems.length === 0) {
    Alert.alert('Cart is empty', 'Please add items to cart before checkout.');
    return;
  }

  const orderPayload = {
    orderId: `ORD-${Date.now()}`,
    items: cartItems.map(({ title, quantity, price }) => ({
      name: title,
      quantity,
      price,
    })),
    totalPrice: Number(totalPrice),
  };

  try {
    await submitOrder(orderPayload);
    Alert.alert('Success', 'Order submitted successfully!');
    dispatch(clearCart());
  } catch (error: any) {
    Alert.alert('Error', error?.data?.message || 'Failed to submit order.');
  }
};
