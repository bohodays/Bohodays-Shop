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
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 gap-4 p-4">
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </ul>
    </>
  );
};

export default Products;
