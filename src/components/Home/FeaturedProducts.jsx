import useData from "../../Hook/useData";
import ProductCard from "../Products/ProductCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useData("/products/featured");
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <h2>주요제품</h2>

      {error && <em className="form_error">{error}</em>}

      <div className="align_center featured_products_list">
        {isLoading
          ? skeletons.map((n) => <ProductCardSkeleton key={n} />)
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
