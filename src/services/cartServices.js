import apiClient from "../utils/api-client";

// 제품 id와 수량을 입력하여 장바구니 추가
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export async function getCartAPI() {
  return await apiClient.get("/cart");
}

export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}

export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}

export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
