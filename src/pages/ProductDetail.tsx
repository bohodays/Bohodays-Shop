import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/UI/Button";
import useCart from "../hooks/useCart";

const ProductDetail = () => {
  const { addOrUpdateItem } = useCart();

  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(options && options[0]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);

  const handleClick = () => {
    // 여기서 장바구니에 추가하면 됨!
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가 되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  const transPrice = (price: number) => {
    const priceToString = String(price);

    let ans = "";
    let count = 0;
    for (let i = priceToString.length - 1; i >= 0; i--) {
      count++;
      ans = priceToString[i] + ans;

      if (count === 3 && i) {
        ans = "," + ans;
        count = 0;
      }
    }
    return ans;
  };

  return (
    <section>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ₩ {transPrice(price)}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option: string, index: number) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="my-2">✔{success}</p>}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
};

export default ProductDetail;
