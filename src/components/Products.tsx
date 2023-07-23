import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

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
