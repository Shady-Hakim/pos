export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Espresso',
    image:
      'https://images.unsplash.com/photo-1605478377041-698d89887859?auto=format&fit=crop&w=800&q=80',
    price: 2.5,
  },
  {
    id: '2',
    title: 'Latte',
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    price: 3.5,
  },
  {
    id: '3',
    title: 'Iced Americano',
    image:
      'https://images.unsplash.com/photo-1590080876593-3c6b2a8aa074?auto=format&fit=crop&w=800&q=80',
    price: 3.0,
  },
  {
    id: '4',
    title: 'Cappuccino',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    price: 3.8,
  },
  {
    id: '5',
    title: 'Mocha',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    price: 4.0,
  },
];

export default products;
