import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const Header = () => {
  const cart = [];

  return (
    <header className="container sticky top-0 z-50 flex items-center justify-between border border-b bg-background py-4">
      <Link href="/" className="text-2xl font-bold">
        Logo
      </Link>

      <nav>
        <ul className="flex items-center justify-between gap-2">
          <li>
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link href="/products">Products</Link>
            </Button>
          </li>
        </ul>
      </nav>

      <Button asChild variant="ghost">
        <Link href="/cart" className="relative">
          <ShoppingCartIcon
            className={cn('size-4', cart.length > 0 && 'fill-red-500 stroke-red-500')}
          />
          {cart.length > 0 && (
            <span className="absolute -top-0.5 right-2.5 z-50">{cart.length}</span>
          )}
        </Link>
      </Button>
    </header>
  );
};

export default Header;
