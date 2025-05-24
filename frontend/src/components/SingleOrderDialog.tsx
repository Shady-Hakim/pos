import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItem[];
}

interface SingleOrderDialogProps {
  order: Order;
}

export function SingleOrderDialog({ order }: SingleOrderDialogProps) {
  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant="solid">View</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Order Details</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack align="start">
                  <Box>
                    <Text fontWeight="bold">Order ID:</Text>
                    <Text>{order.orderId}</Text>
                  </Box>

                  <Box w="full">
                    <Text fontWeight="bold" mb={2}>
                      Items:
                    </Text>
                    <VStack align="start">
                      {order.items.map((item, index) => (
                        <Box key={index} w="full">
                          <Text>
                            {item.name} — {item.quantity} × $
                            {item.price.toFixed(2)}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Total Price:</Text>
                    <Text color="green.500">
                      ${order.totalPrice.toFixed(2)}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Order Date:</Text>
                    <Text>{format(new Date(order.createdAt), 'PPPpp')}</Text>
                  </Box>
                </VStack>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" position="absolute" right="4" top="4" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
}
