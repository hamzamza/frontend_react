// ffc
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.css";
import "./home.css";
import FeaturedProperties from "../../components/featured/FeaturedProperties";
import PropertyList from "../../components/properties/PropertyList";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";
// import SearchItem from "../../components/searchItem/SearchItem";
function Home() {
  return (
    <>
      <Navbar />
      <Header search={true} />
      <div className="homeContainer">
        <h2 className="titleOf">Browse by city</h2>
        <Featured />
        <h2 className="titleOf">Browse by property type</h2>
        <PropertyList />
        <h2 className="titleOf">Homes guests love</h2>

        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  );
}

export default Home;
