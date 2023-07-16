import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../components/UI/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

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
    // 제품의 사진을 Cloudinary에 업로드하고 URL을 획득
    // Firebase에 새로운 제품을 추가함
    if (file) {
      uploadImage(file).then((url) => {
        addNewProduct(product, url);
      });
    }
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
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
        <Button text={"제품 등록하기"} />
      </form>
    </section>
  );
};

export default NewProduct;
