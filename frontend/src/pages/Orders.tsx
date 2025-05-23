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
} from '@chakra-ui/react';
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from '../../services/ordersApi';
import { SingleOrderDialog } from '@/components';
import type { Order } from '@/components/SingleOrderDialog';

export default function Orders() {
  const [selection, setSelection] = useState<string[]>([]);
  const { data: ordersData, error, isLoading, refetch } = useGetOrdersQuery({});
  const [deleteOrder] = useDeleteOrderMutation();

  const orders: Order[] = ordersData?.data || [];
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < orders.length;

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id).unwrap();
      setSelection((prev) => prev.filter((orderId) => orderId !== id));
      refetch();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="lg" />
        <Text mt={4}>Loading orders...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={8} color="red.500">
        <Text>Failed to load orders.</Text>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box textAlign="center" mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Orders
        </Heading>
        <Text>No orders yet. They will appear here once available.</Text>
      </Box>
    );
  }

  const rows = orders.map((item) => (
    <Table.Row
      key={item._id}
      data-selected={selection.includes(item.orderId) ? '' : undefined}>
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.orderId)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.orderId]
                : selection.filter((orderId) => orderId !== item.orderId)
            );
          }}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.orderId}</Table.Cell>
      <Table.Cell>{new Date(item.createdAt).toLocaleString()}</Table.Cell>
      <Table.Cell>${item.totalPrice.toFixed(2)}</Table.Cell>
      <Table.Cell>
        <SingleOrderDialog order={item} />
        <Button variant="outline" onClick={() => handleDelete(item._id)} mt={2}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Heading as="h2" pb={4}>
        Orders
      </Heading>

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
                    changes.checked ? orders.map((item) => item.orderId) : []
                  );
                }}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Order Id</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
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
                    const target = orders.find((o) => o.orderId === id);
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
