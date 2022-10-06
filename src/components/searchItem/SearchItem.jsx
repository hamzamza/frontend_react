import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      {item.photos[0] === "photo1" || !item.photos[0] ? (
        <img
          src="https://img.freepik.com/vecteurs-libre/fond-facade-hotel-plat_23-2148157379.jpg?w=2000"
          alt=""
          className="siImg"
        />
      ) : (
        <img src={item.photos[0]} alt="" className="siImg" />
      )}
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siDistance">{item.address} </span>
        <span className="siTaxiOp">
          {item.fetured ? "Free airport taxi" : "good one"}
        </span>
        <span className="siSubtitle">{item.desc}</span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>
              {item.rating}.00{" "}
              <span>
                <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
              </span>
            </button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotel/select/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
