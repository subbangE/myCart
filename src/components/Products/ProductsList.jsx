import "./ProductsList.css";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import useData from "../../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const page = search.get("page");

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // 서버에서 가져오는 데이터에는 제품데이터 및 페이지 등 다른 데이터도 있음
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        category,
        page,
      },
    },
    [category, page]
  );

  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  // const { data, error, isLoading } = useData("/products");
  // // const [products, setProducts] = useState([]); // 제품들 데이터
  // // const [error, setError] = useState(""); // 에러메세지

  // useEffect(() => {
  //   // 처음시작시 제품데이터를 가져옴
  //   apiClient
  //     .get("/products") // GET 으로 요청 기본주소 + /products
  //     .then((res) => setProducts(res.data.products)) // 결과가 나오면 콘솔 출력
  //     .catch((err) => setError(err)); // 에러 발생시 콘솔 출력
  // }, []);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {data && (
          <Pagination
            total={data.totalProducts}
            perPage={8}
            onClick={handlePageChange}
            currentPage={page}
          />
        )}
      </div>
    </section>
  );
};

export default ProductsList;
