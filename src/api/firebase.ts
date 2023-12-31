import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { userType } from "../types/user-type";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { v4 as uuid } from "uuid";
import { productType } from "../pages/NewProduct";
import { IProduct } from "../types/product-type";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export async function onUserStateChange(callback: (user: userType) => void) {
  onAuthStateChanged(auth, async (user: userType) => {
    // 1. 사용자가 있는 경우 (로그인한 경우)
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user: userType) {
  // 2. 사용자가 어드민 권한을 가지고 있는지 확인
  // 3. {...user, isAdmin: true/false}
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user!.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product: productType, imageURL: string) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: product.price,
    image: imageURL,
    options: product.options && product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(
  userId: string | null | undefined
): Promise<IProduct[]> {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(
  userId: string | null | undefined,
  product: IProduct
) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(
  userId: string | null | undefined,
  productId: string
) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
