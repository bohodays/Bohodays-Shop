export type productCardType = {
  product: {
    id?: string;
    title?: string;
    image?: string;
    price?: number;
    category?: string;
    description?: string;
    options?: string;
  };
};

const ProductCard = ({
  product: { id, image, title, category, price },
}: productCardType) => {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`${price}`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
};

export default ProductCard;
