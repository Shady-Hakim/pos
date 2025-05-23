import {
  Button,
  CloseButton,
  Drawer,
  HStack,
  Link,
  Portal,
} from '@chakra-ui/react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Orders', path: '/orders' },
  { name: 'Products', path: '/products' },
];

export default function Navbar() {
  return (
    <HStack wrap="wrap">
      <Drawer.Root key={'start'} placement={'start'}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Menu
          </Button>
        </Drawer.Trigger>
        <Drawer.Title>Orders Management System</Drawer.Title>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Admin dashboard</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                {navItems.map((item) => (
                  <Link
                    display={'block'}
                    key={item.name}
                    href={item.path}
                    fontSize="lg"
                    mb={4}>
                    {item.name}
                  </Link>
                ))}
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </HStack>
  );
}
