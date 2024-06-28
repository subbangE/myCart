import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI } from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // 제품과, 갯수를 입력하여 장바구니 업데이트
  const addToCart = (product, quantity) => {
    // 같은 제품이 추가되면 수량만 추가
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("상품 추가 성공!");
      })
      .catch((err) => {
        toast.error("상품 추가에 실패했습니다.");
      });
  };

  //시작시 jwt 토큰을 가져옴
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload(); //재시작(리프레쉬)
      } else {
        setUser(jwtUser); //유효기간 내일때 유저정보 저장
      }
    } catch (err) {}
  }, []);

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <ToastContainer position="bottom-right" />
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
