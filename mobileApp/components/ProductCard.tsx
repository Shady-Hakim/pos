import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {
  Button,
  Card,
  Text,
  IconButton,
  RadioButton,
} from 'react-native-paper';
import {
  decrementQuantity,
  incrementQuantity,
  parseQuantityInput,
} from '@/helpers/product';

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: (size: string) => void;
  showAddToCartButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  quantity,
  onQuantityChange,
  onAddToCart,
  showAddToCartButton = true,
}) => {
  const [size, setSize] = useState('M');

  const increment = () => onQuantityChange(incrementQuantity(quantity));

  const decrement = () => onQuantityChange(decrementQuantity(quantity));

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: image }} style={styles.image} />
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.price}>
          ${price.toFixed(2)}
        </Text>
        <Text style={styles.label}>Size:</Text>
        <RadioButton.Group onValueChange={setSize} value={size}>
          <View style={styles.radioGroup}>
            <RadioButton.Item label="S" value="S" />
            <RadioButton.Item label="M" value="M" />
            <RadioButton.Item label="L" value="L" />
          </View>
        </RadioButton.Group>
        <View style={styles.quantityContainer}>
          <IconButton icon="minus" size={20} onPress={decrement} />
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseQuantityInput(text);
              if (num !== null) {
                onQuantityChange(num);
              }
            }}
          />
          <IconButton icon="plus" size={20} onPress={increment} />
        </View>
      </Card.Content>
      {showAddToCartButton && (
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => onAddToCart(size)}
            style={{ flex: 1 }}>
            Add to Cart
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    elevation: 3,
  },
  image: {
    height: 150,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    marginBottom: 8,
    color: '#444',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 40,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center',
    marginHorizontal: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default ProductCard;
