import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { IProduct } from "../types/product-type";

export default function useCart() {
  const userAuth = useAuthContext();
  const uid = userAuth?.uid;
  const queryClient = useQueryClient();
  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    async (product: IProduct) => {
      await addOrUpdateToCart(uid, product);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation((id: string) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
