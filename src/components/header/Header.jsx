import {
  faArrowAltCircleRight,
  faBed,
  faCalendar,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faSearch,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
//
import { AuthContext } from "../../context/authContext";
const NEW_SEARCH = "NEW_SEARCH";

//
function Header({ search }) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState({});
  const [opendate, setOpenDate] = useState(false);
  const [openoptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adults: 1, childrens: 0, rooms: 1 });
  const [danger, setDanger] = useState({
    adults: false,
    childrens: false,
    rooms: false,
  });

  const handelOption = (name, operation) => {
    if ((options[name] === 0) & (operation === "d")) {
      setDanger((prev) => {
        return { ...prev, [name]: true };
      });

      setTimeout(() => {
        setDanger((prev) => {
          return { ...prev, [name]: false };
        });
      }, 500);
    }
    setOptions((pre) => {
      if ((options[name] === 0) & (operation === "d")) {
        return { ...pre };
      } else {
        return {
          ...pre,
          [name]:
            (operation === "d") & (options[name] >= 0)
              ? options[name] - 1
              : options[name] + 1,
        };
      }
    });
  };
  const { dispatch, ...others } = useContext(SearchContext);

  const navigate = useNavigate();
  const handelSearch = () => {
    if (destination.length > 0) {
      dispatch({
        type: NEW_SEARCH,
        payload: {
          city: destination,
          dates: date,
          options: options,
        },
      });

      // never run for a bus tran or girls when one leave anothter arrives !
      console.log(others);
      navigate("/hotels", { state: { destination, date, options } });
    }
  };

  return (
    <div className="header">
      <div
        className={!search ? "headerContainer listMode " : "headerContainer"}
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon className="header-logo" icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem ">
            <FontAwesomeIcon className="header-logo" icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon className="header-logo" icon={faCar} />
            <span>Car centeral</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon className="header-logo" icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon className="header-logo" icon={faTaxi} />
            <span>Airroport taxis</span>
          </div>
        </div>
        {search && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? it's genius
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels unlick instant savings of 10% or
              more with a free lambooking account
            </p>
            {!user && <button className="headerBtn">Sign in / Regester</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon className="search-logo" icon={faBed} />
                <input
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                  type="text"
                  className="headerSearchInput"
                  placeholder="Where are you going ? "
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenDate((d) => !d);
                  }}
                >
                  {format(date[0].startDate, "MM/dd/yyyy")} to{" "}
                  {format(date[0].endDate, "MM/dd/yyyy")}
                </span>
                {opendate && (
                  <DateRange
                    className="Date"
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  className="search-logo"
                  onClick={() => {
                    setOpenOptions((d) => !d);
                  }}
                  icon={faPerson}
                />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOptions((d) => !d);
                  }}
                >
                  {`${options.adults} adults ${options.childrens} childrens ${options.rooms} rooms`}
                </span>
                {openoptions && (
                  <div className="options">
                    <div className="optionitem">
                      <span className="optiontext">Adults</span>
                      <div className="counter">
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("adults", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.adults ? "active" : " "
                          }`}
                        >
                          {options.adults}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("adults", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionitem">
                      <span className="optiontext">Children</span>
                      <div className="counter">
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("childrens", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.childrens ? "active" : " "
                          }`}
                        >
                          {options.childrens}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("childrens", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionitem">
                      <span className="optiontext">rooms</span>
                      <div className="counter">
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("rooms", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.rooms ? "active" : " "
                          }`}
                        >
                          {options.rooms}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("rooms", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="ssch">
                <button className="searchBtn" onClick={handelSearch}>
                  <FontAwesomeIcon
                    className="search-btn-logo"
                    icon={faSearch}
                  />
                  <span className="searchBtnSpan">Search</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
