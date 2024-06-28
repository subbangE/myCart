import { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = () => {
  //선택한 이미지 기억 (선택한 이미지 인덱스 번호를 저장)
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); //주소변수값 id를 얻기
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  //console.log(id);
  //id값으로 제품 데이터 요청
  const { data: product, error, isLoading } = useData(`products/${id}`);
  //console.log(product);
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

            {/* 큰 이미지는 왼쪽의 4개의 이미지중 선택한 인덱스 번호으 이미지 표시 */}
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
            {user && (
              <>
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
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
