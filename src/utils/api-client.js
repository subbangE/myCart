import axios from "axios";

// 백엔드 기본주소를 axios 객체에 설정
export default axios.create({
  baseURL: "http://localhost:5000/api",
});
