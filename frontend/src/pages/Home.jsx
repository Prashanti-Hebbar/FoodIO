import "../App.css";
import "./recipes";
import Carousel from "../components/home_page_components/Carousel";
import Testimonial from "../components/home_page_components/Testimonial";
import RecipeSection from "../components/home_page_components/RecipeSection";

const Home = () => {

  return (
    <div>
      <Carousel></Carousel>
      <RecipeSection ></RecipeSection>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
