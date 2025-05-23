import './App.css';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Home, Orders, Products } from '@/pages';
import { Navbar } from '@/components';

function App() {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4" m={4}>
      <GridItem colSpan={4}>
        <Container bg={'white'} p={4} borderRadius="md" boxShadow="md">
          <Navbar />
        </Container>
      </GridItem>
      <GridItem colSpan={4} pt={4}>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Container>
      </GridItem>
    </Grid>
  );
}

export default App;
