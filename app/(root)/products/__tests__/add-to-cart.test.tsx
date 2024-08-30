import { fireEvent, screen } from '@testing-library/react';

import AddToCart from '@/app/(root)/products/_components/add-to-cart';
import { cartSliceActions } from '@/app/(root)/products/_slices/cart-slice';
import { ProductType } from '@/app/(root)/products/types';
import { renderWithProviders } from '@/shared/lib/tests';

const mockProduct: ProductType = {
  availabilityStatus: 'In Stock',
  brand: 'Calvin Klein',
  category: 'fragrances',
  description:
    "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
  dimensions: {
    width: 11.53,
    height: 14.44,
    depth: 6.81,
  },
  discountPercentage: 0.32,
  id: 6,
  images: [
    'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png',
    'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png',
    'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png',
  ],
  meta: {
    createdAt: new Date(),
    updatedAt: new Date(),
    barcode: '2210136215089',
    qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
  },
  minimumOrderQuantity: 20,
  price: 49.99,
  rating: 4.85,
  returnPolicy: 'No return policy',
  reviews: [],
  shippingInformation: 'Ships overnight',
  sku: 'DZM2JQZE',
  stock: 17,
  tags: ['fragrances', 'perfumes'],
  thumbnail:
    'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
  title: 'Calvin Klein CK One',
  warrantyInformation: '5 year warranty',
  weight: 5,
};

describe('AddToCart', () => {
  test('should render component', () => {
    renderWithProviders(<AddToCart product={mockProduct} />);
    expect(screen.getByTestId('shopping-cart-btn')).toBeInTheDocument();
  });

  test('should display quantity controls when qty > 0', () => {
    const initialState = [{ product: mockProduct, qty: 2 }];

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('remove-cart-item-btn')).toBeInTheDocument();
    expect(screen.getByTestId('add-cart-item-btn')).toBeInTheDocument();
    expect(screen.getByTestId('clear-cart-btn')).toBeInTheDocument();
  });

  test('should display add button when qty = 0 and not others', () => {
    const initialState = [{ product: mockProduct, qty: 0 }];

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });

    expect(screen.getByTestId('shopping-cart-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('remove-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('clear-cart-btn')).not.toBeInTheDocument();
  });

  test('should call handleToggleToCart on plus button click and add qty + 1', async () => {
    const initialState = [{ product: mockProduct, qty: 1 }];
    const mockToggleAction = jest.spyOn(cartSliceActions, 'toggleProductInCart');

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });

    await fireEvent.click(screen.getByTestId('add-cart-item-btn'));

    expect(mockToggleAction).toHaveBeenCalledWith({
      product: mockProduct,
      actionType: 'add',
    });
    expect(screen.getByText('2')).toBeInTheDocument();
    mockToggleAction.mockRestore();
  });

  test('should call handleToggleToCart on minus button click and add qty - 1', async () => {
    const initialState = [{ product: mockProduct, qty: 2 }];
    const mockToggleAction = jest.spyOn(cartSliceActions, 'toggleProductInCart');

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });

    await fireEvent.click(screen.getByTestId('remove-cart-item-btn'));

    expect(mockToggleAction).toHaveBeenCalledWith({
      product: mockProduct,
      actionType: 'remove',
    });
    expect(screen.getByText('1')).toBeInTheDocument();
    mockToggleAction.mockRestore();
  });

  test('should call handleToggleToCart on minus button click and if qty=1 remove product from cart', async () => {
    const initialState = [{ product: mockProduct, qty: 1 }];
    const mockToggleAction = jest.spyOn(cartSliceActions, 'toggleProductInCart');

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });

    await fireEvent.click(screen.getByTestId('remove-cart-item-btn'));

    expect(mockToggleAction).toHaveBeenCalledWith({
      product: mockProduct,
      actionType: 'remove',
    });
    expect(screen.getByTestId('shopping-cart-btn')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('remove-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('clear-cart-btn')).not.toBeInTheDocument();
    mockToggleAction.mockRestore();
  });

  test('should call handleRemove on x button click and remove controls btns', async () => {
    const initialState = [{ product: mockProduct, qty: 2 }];
    const mockToggleAction = jest.spyOn(cartSliceActions, 'removeProductFromCart');

    renderWithProviders(<AddToCart product={mockProduct} />, {
      preloadedState: {
        cartSlice: {
          cartItems: initialState,
        },
      },
    });

    await fireEvent.click(screen.getByTestId('clear-cart-btn'));

    expect(mockToggleAction).toHaveBeenCalledWith(mockProduct.id);
    expect(screen.getByTestId('shopping-cart-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('remove-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-cart-item-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('clear-cart-btn')).not.toBeInTheDocument();
    mockToggleAction.mockRestore();
  });
});
