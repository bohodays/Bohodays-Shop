import { useNavigate } from "react-router-dom";

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
  product,
  product: { id, image, title, category, price },
}: productCardType) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/products/${id}`, { state: { product } })}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        {/* truncate를 설정해주면 텍스트가 길어지면 자동으로 ... 표시됨  */}
        <h3 className="truncate">{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;
