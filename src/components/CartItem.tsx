import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IProduct } from "../types/product-type";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

interface IProps {
  product: IProduct;
  uid: number;
}

const CartItem = ({ product, uid }: IProps) => {
  const { id, image, title, option, quantity } = product;

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => {
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };

  const handleDelete = () => {
    removeFromCart(uid, +id);
  };
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{option}</p>
        <div>
          <AiOutlineMinusSquare onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} />
          <RiDeleteBin5Fill onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
