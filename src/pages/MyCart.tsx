import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { IProduct } from "../types/product-type";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";

const SHIPPING = 3000;

const MyCart = () => {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery<IProduct[]>(["carts"], () =>
    getCart(uid)
  );

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev: number, current: IProduct) =>
        prev + current.price * current.quantity,
      0
    );

  return (
    <div>
      <p>내 장바구니</p>
      {!hasProducts && (
        <p>장바구니에 상품이 없습니다. 원하는 물품을 카트에 담아보세요!</p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product?.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals />
            <PriceCard
              text="총가격"
              price={(totalPrice as number) + SHIPPING}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
