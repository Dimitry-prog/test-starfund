import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export default function Home() {
  return (
    <section className="grid place-content-center items-center gap-4">
      <h1 className="text-center text-lg font-bold md:text-2xl">
        Click link below to see all products
      </h1>
      <Button asChild variant="ghost">
        <Link href="/products" className="justify-self-center">
          All Products
        </Link>
      </Button>
    </section>
  );
}
