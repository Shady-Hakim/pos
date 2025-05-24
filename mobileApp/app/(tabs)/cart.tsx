import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  increment,
  decrement,
  confirmRemove,
  confirmClearCart,
  handleCheckout,
} from '../../helpers/cart';
import { useSubmitOrderMutation } from '@/services/ordersApi';

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItemsObject = useSelector((state: RootState) => state.cart.items);

  const cartItems = useMemo(
    () => Object.values(cartItemsObject),
    [cartItemsObject]
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [submitOrder, { isLoading }] = useSubmitOrderMutation();

  const onCheckout = () => {
    handleCheckout(cartItems, totalPrice, submitOrder, dispatch);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="titleLarge">Your cart is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListFooterComponent={
        <View style={styles.footer}>
          <Text variant="titleLarge">Total: ${totalPrice.toFixed(2)}</Text>
          <Button
            mode="contained"
            onPress={onCheckout}
            loading={isLoading}
            disabled={isLoading}>
            Checkout
          </Button>
          <Button
            onPress={() => confirmClearCart(dispatch)}
            style={{ marginTop: 8 }}
            mode="outlined"
            textColor="#f00"
            disabled={isLoading}>
            Clear Cart
          </Button>
        </View>
      }
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image }} style={styles.image} />
          <Card.Content>
            <Text variant="titleLarge" style={{ marginBottom: 4 }}>
              {item.title}
            </Text>
            <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
              ${item.price.toFixed(2)}
            </Text>
            <View style={styles.quantityContainer}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => decrement(dispatch, item.id, item.quantity)}
                disabled={isLoading}
              />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => increment(dispatch, item.id, item.quantity)}
                disabled={isLoading}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => confirmRemove(dispatch, item.id)}
                disabled={isLoading}
              />
            </View>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  image: {
    height: 120,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default CartScreen;
