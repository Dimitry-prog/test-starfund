import Link from 'next/link';

import Cart from '@/app/(root)/products/_components/cart';
import { Button } from '@/shared/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border border-b bg-background py-4">
      <div className="container flex items-center justify-between">
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

        <Cart />
      </div>
    </header>
  );
};

export default Header;
