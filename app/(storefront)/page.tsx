import Brands from "../components/storefront/Brands";
import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import FooterCard from "../components/storefront/FooterCard";
import { Hero } from "../components/storefront/Hero";
import { Navbar } from "../components/storefront/Navbar";
import NewArrivals from "../components/storefront/NewArrivals";
import Slider from "../components/storefront/Slider";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <Brands />
      <FeaturedProducts />
      <NewArrivals />
      <CategoriesSelection />
    </div>
  );
}
