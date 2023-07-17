import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard, { productCardType } from "./ProductCard";

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<any>(["products"], getProducts);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>error...</p>}
      <ul>
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </ul>
    </>
  );
};

export default Products;
