import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { handleQuantityChange, handleAddToCart } from '@/helpers/home';
import products from '../mocks/productsMock';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const [localQuantities, setLocalQuantities] = useState<
    Record<string, number>
  >(() =>
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as Record<string, number>)
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const quantity = localQuantities[item.id] ?? 1;

        return (
          <ProductCard
            title={item.title}
            image={item.image}
            price={item.price}
            quantity={quantity}
            onQuantityChange={(qty) =>
              handleQuantityChange(item.id, qty, setLocalQuantities)
            }
            onAddToCart={(selectedSize) =>
              handleAddToCart(dispatch, item, localQuantities, selectedSize)
            }
            showAddToCartButton={true}
          />
        );
      }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No products available</Text>
      }
      ItemSeparatorComponent={() => <Text style={{ height: 16 }} />}
      ListFooterComponent={<Text style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
});
