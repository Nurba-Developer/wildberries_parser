import { render, screen } from '@testing-library/react';
import ProductsTable from './ProductsTable';

const mockProducts = [
  {
    id: 1,
    name: 'Товар 1',
    price: 1000,
    sale_price: 900,  // поправил ключ на sale_price, чтобы совпадало с твоим компонентом
    rating: 4.5,
    feedbacks: 10,    // и тут тоже поправил, если в компоненте используется feedbacks
    brand: { name: 'Бренд1' }, // добавил бренд, чтобы не было undefined
    url: 'http://example.com', // для ссылки
  },
];

describe('ProductsTable', () => {
  it('отображает цену и рейтинг', () => {
    render(<ProductsTable products={mockProducts} />);

    screen.debug(); // можно временно оставить, чтобы увидеть HTML в консоли

    // Проверяем, что цена с форматированием и ₽ есть
    expect(screen.getByText(/1\s?000\s?₽/)).toBeInTheDocument();

    // Проверяем, что скидка тоже отображается (900 ₽)
    expect(screen.getByText(/900\s?₽/)).toBeInTheDocument();

    // Проверяем, что рейтинг отображается в формате (4.5)
    expect(screen.getByText(/\(4\.5\)/)).toBeInTheDocument();
  });
});
