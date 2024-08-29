'use server';

export const getProductById = async (productId: string) => {
  const response = await fetch(`${process.env.BASE_API_URL}/products/${productId}`, {
    cache: 'force-cache',
  });
  const product = await response.json();

  return product;
};
