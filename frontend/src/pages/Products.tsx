import { useState } from 'react';
import {
  ActionBar,
  Button,
  Checkbox,
  Heading,
  Kbd,
  Portal,
  Table,
  Text,
  Spinner,
  Box,
  HStack,
  Flex,
  Center,
} from '@chakra-ui/react';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../services/productsApi';
import { AddProductDialog } from '@/components';

interface Product {
  _id: string;
  createdAt: string;
  image: string;
  price: number;
  name: string;
}

export default function Products() {
  const [selection, setSelection] = useState<string[]>([]);
  const {
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();

  const products: Product[] = productsData?.data || [];
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < products.length;

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      setSelection((prev) => prev.filter((productId) => productId !== id));
      refetch();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleAddProduct = async (values: {
    image: string;
    name: string;
    price: number;
  }) => {
    try {
      await addProduct(values).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="lg" />
        <Text mt={4}>Loading products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={8} color="red.500">
        <Text>Failed to load products.</Text>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box textAlign="center" mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Products
        </Heading>
        <Text>No products yet. add a new product.</Text>
        <Center mt={4}>
          <AddProductDialog onSubmit={handleAddProduct} />
        </Center>
      </Box>
    );
  }

  const rows = products.map((item) => (
    <Table.Row
      key={item._id}
      data-selected={selection.includes(item._id) ? '' : undefined}>
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item._id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item._id]
                : selection.filter((productId) => productId !== item._id)
            );
          }}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.image}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{new Date(item.createdAt).toLocaleString()}</Table.Cell>
      <Table.Cell>${item.price.toFixed(2)}</Table.Cell>
      <Table.Cell>
        <Button variant="outline" onClick={() => handleDelete(item._id)}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Heading as="h2" pb={4}>
          Products
        </Heading>
        <HStack wrap="wrap" gap="4" mb={4}>
          <AddProductDialog onSubmit={handleAddProduct} />
        </HStack>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox.Root
                size="sm"
                top="0.5"
                aria-label="Select all rows"
                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? products.map((item) => item._id) : []
                  );
                }}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  selection.forEach(async (id) => {
                    const target = products.find((p) => p._id === id);
                    if (target) await handleDelete(target._id);
                  })
                }>
                Delete <Kbd>⌫</Kbd>
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
}
