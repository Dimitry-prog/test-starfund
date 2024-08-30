import { fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as nextRouting from 'next/navigation';

import Sorting from '@/shared/components/sorting';
import { SORTING_PRODUCTS } from '@/shared/lib/constants';

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Sorting', () => {
  let pathnameMock: string;
  let routerMock: { replace: jest.Mock<void, [string, { scroll: boolean }]> };
  let searchParamsMock: URLSearchParams;

  beforeEach(() => {
    pathnameMock = '/products';
    routerMock = { replace: jest.fn() };
    searchParamsMock = new URLSearchParams();

    (nextRouting.usePathname as jest.Mock).mockReturnValue(pathnameMock);
    (nextRouting.useRouter as jest.Mock).mockReturnValue(routerMock);
    (nextRouting.useSearchParams as jest.Mock).mockReturnValue(searchParamsMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render with default sorting content', () => {
    render(<Sorting />);

    expect(screen.getByText('SortBy')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('should render all options when trigger clicked', async () => {
    render(<Sorting />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText('SortBy')).toBeInTheDocument();

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    SORTING_PRODUCTS.forEach((item) => {
      expect(screen.getByRole('option', { name: item.label })).toBeInTheDocument();
    });
  });

  test('should select the correct option in the dropdown', () => {
    render(<Sorting />);

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.click(selectElement, { target: { value: 'price_asc' } });

    expect(selectElement.value).toBe('price_asc');
  });

  test('should clean URL when reset clicked', async () => {
    render(<Sorting />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    const option = screen.getByRole('option', { name: 'Price asc' });
    expect(option).toBeInTheDocument();

    await userEvent.click(option);

    expect(routerMock.replace).toHaveBeenLastCalledWith(
      `${pathnameMock}?page=1&sortBy=price&order=asc`,
      {
        scroll: false,
      }
    );

    await userEvent.click(trigger);
    const optionReset = screen.getByRole('option', { name: 'Reset' });
    expect(optionReset).toBeInTheDocument();

    await userEvent.click(optionReset);

    expect(routerMock.replace).toHaveBeenCalledWith(`${pathnameMock}?`, {
      scroll: false,
    });
    expect(routerMock.replace).toHaveBeenCalledTimes(2);
  });

  test('should update URL parameters correctly on value change', async () => {
    render(<Sorting />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    const option = screen.getByRole('option', { name: 'Price asc' });
    expect(option).toBeInTheDocument();

    await userEvent.click(option);

    expect(routerMock.replace).toHaveBeenCalledWith(
      `${pathnameMock}?page=1&sortBy=price&order=asc`,
      {
        scroll: false,
      }
    );
  });
});
