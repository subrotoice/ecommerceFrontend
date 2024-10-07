import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductsComponent from "../components/ProductsComponent";

const Products = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <Navbar />
      </div>
      <ProductsComponent />
      <Footer />
    </div>
  );
};

export default Products;
