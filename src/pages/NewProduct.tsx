import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../components/UI/Button";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";

export type productType = {
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  options?: string;
};

type fileType = File;

const NewProduct = () => {
  const [product, setProduct] = useState<productType>({});
  const [file, setFile] = useState<fileType>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const { addProduct } = useProducts();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file" && files) {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    // 제품의 사진을 Cloudinary에 업로드하고 URL을 획득
    // Firebase에 새로운 제품을 추가함
    if (file) {
      uploadImage(file)
        .then((url) => {
          addProduct.mutate(
            { product, url },
            {
              onSuccess: () => {
                setSuccess("성공적으로 제품이 추가되었습니다.");
                setTimeout(() => {
                  setSuccess("");
                }, 4000);
              },
            }
          );
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✔ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드 중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
};

export default NewProduct;
