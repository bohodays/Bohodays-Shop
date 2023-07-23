import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";

type MutationType = {
  product: {
    title?: string;
    price?: number;
    category?: string;
    description?: string;
    options?: string;
  };
  url: string;
};

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }: MutationType) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { productsQuery, addProduct };
}
