import { useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";

const product = {
  id: 1,
  title: "상품 타이틀",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
  price: 9900,
  images: [
    "https://via.placeholder.com/500x500?text=Product+Image+1",
    "https://via.placeholder.com/500x500?text=Product+Image+2",
    "https://via.placeholder.com/500x500?text=Product+Image+3",
    "https://via.placeholder.com/500x500?text=Product+Image+4",
  ],
  stock: 10,
};

const SingleProductPage = ({ addToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const { id } = useParams();
  // console.log(id);
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  // console.log(product);

  const [quantity, setQuantity] = useState(1);

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            {/* 큰 이미지는 왼쪽의 4개의 이미지중 선택한 인덱스 번호의 이미지 표시 */}
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ￦ {product.price.toLocaleString("ko-KR")} 원
            </p>

            <h2 className="quantity_title">구매개수:</h2>
            <div className="align_center quantity_input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="search_button add_cart"
            >
              장바구니 추가
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
