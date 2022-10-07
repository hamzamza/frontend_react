import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
// import Reserve from "../../components/reserve/Reserve";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";
import API from "../../apiUrl";

const Hotel = () => {
  const navigate = useNavigate();
  let { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [reserveopen, setReserveOpen] = useState(false);

  const [isopen, setIsopen] = useState(false);
  const locate = useLocation();
  const { data, loading, error } = useFetch(`${API}/api${locate.pathname}`);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction, max) => {
    let newSlideNumber;

    if (max > 0) {
      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? max : slideNumber - 1;
      } else {
        newSlideNumber = slideNumber === max ? 0 : slideNumber + 1;
      }

      setSlideNumber(newSlideNumber);
    }
  };

  const dif = (dates) => {
    return dates[0]
      ? (dates[0].endDate - dates[0].startDate) / (1000 * 60 * 60 * 24) + 1
      : 0;
  };
  const numrroms = () => {
    return options.room ? options.room : 1;
  };
  const handelBooking = () => {
    if (user) {
      setReserveOpen((old) => !old);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log(dates);
        }}
      >
        click me
      </button>
      {!loading && error.message ? (
        "ERROR IN THE URL"
      ) : (
        <div>
          <Navbar />
          <Header type="list" />
          {loading ? (
            "loading ........"
          ) : (
            <div className="hotelContainer">
              {open && (
                <div className="slider">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpen(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => {
                      handleMove("l", data.photos.length - 2);
                      console.log(data.photos.length - 1);
                    }}
                  />
                  <div className="sliderWrapper">
                    <img
                      src={data.photos[slideNumber]}
                      alt=""
                      className="sliderImg"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => {
                      handleMove("r", data.photos.length - 2);
                      console.log(data.photos.length - 1);
                    }}
                  />
                </div>
              )}
              {!open && (
                <div className="hotelWrapper">
                  <button className="bookNow" onClick={handelBooking}>
                    Reserve or Book Now!
                  </button>
                  <h1 className="hotelTitle">Tower Street Apartments</h1>
                  <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Elton St 125 New york</span>
                  </div>
                  <span className="hotelDistance">
                    Excellent location – 500m from center
                  </span>
                  <span className="hotelPriceHighlight">
                    Book a stay over $114 at this property and get a free
                    airport taxi
                  </span>
                  <div className="hotelImages">
                    {data.photos.map((photo, i) => (
                      <div className="hotelImgWrapper" key={i}>
                        <img
                          onClick={() => handleOpen(i)}
                          src={photo}
                          alt=""
                          className="hotelImg"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="hotelDetails">
                    <div className="hotelDetailsTexts">
                      <h1 className="hotelTitle">Stay in the heart of City</h1>
                      <p className="hotelDesc">
                        Located a 5-minute walk from St. Florian's Gate in
                        Krakow, Tower Street Apartments has accommodations with
                        air conditioning and free WiFi. The units come with
                        hardwood floors and feature a fully equipped kitchenette
                        with a microwave, a flat-screen TV, and a private
                        bathroom with shower and a hairdryer. A fridge is also
                        offered, as well as an electric tea pot and a coffee
                        machine. Popular points of interest near the apartment
                        include Cloth Hall, Main Market Square and Town Hall
                        Tower. The nearest airport is John Paul II International
                        KrakówBalice, 16.1 km from Tower Street Apartments, and
                        the property offers a paid airport shuttle service.
                      </p>
                    </div>
                    <div className="hotelDetailsPrice">
                      <h1>
                        Perfect for a {dif(dates)}
                        -night stay!
                      </h1>
                      <span>
                        {}
                        Located in the real heart of Krakow, this property has
                        an excellent location score of 9.8!
                      </span>
                      <h2>
                        <b>
                          ${dif(dates) * data.cheapestPrice * numrroms()} for{" "}
                          {dif(dates)}
                          nights
                        </b>
                      </h2>
                      <button onClick={handelBooking}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* 
       <button
          onClick={() => {
            console.log(
              (others.dates[0].endDate - others.dates[0].startDate) /
                (1000 * 60 * 60 * 24) +
                1
            );
          }}
        >
          {others.city}
        </button>
      */}
              <MailList />
              <Footer />
            </div>
          )}
        </div>
      )}
      {reserveopen && <Reserve hotelId={data._id} setOpen={setReserveOpen} />}
    </div>
  );
};

export default Hotel;
