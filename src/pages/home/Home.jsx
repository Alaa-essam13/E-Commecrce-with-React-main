import Slider from "../../components/slider/Slider";
import HeadingTitle from "../../components/heading-title/HeadingTitle";
import SpecialOffers from "../../components/special-offers/SpecialOffers";
import Brands from "../../components/brands/Brands";
import Category from "../../components/category/Category";
import HeaderBanner from "../../components/header-banner/HeaderBanner";
import {products} from "../../data/products";
import Foter from "../../components/foter/Foter";

const Home = () => {


  const laptops = products.filter((p) => p.isLaptop === true);
  const mobiles = products.filter((p) => p.isLaptop === false);

  return (
    <>
      <HeaderBanner />
      <Category />
      <SpecialOffers />
      <HeadingTitle title="   Women Fashion " />
      <Slider data={laptops} />
      <HeadingTitle title="   Men Fashion " />
      <Slider data={mobiles} />
      <HeadingTitle title="   Shop by brand " />
      <Brands />
      <Foter/>
    </>
  );
};

export default Home;
