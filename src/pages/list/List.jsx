import {
  faArrowAltCircleRight,
  faBed,
  faCalendar,
  faCalendarDays,
  faCancel,
  faCar,
  faPerson,
  faPlane,
  faSearch,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DateRange } from "react-date-range";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
//
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
function List() {
  const location = useLocation();
  const NEW_SEARCH = "NEW_SEARCH";
  //  const [search, setSearch] = useState(location.state);

  const [date, setDate] = useState(
    location.state
      ? location.state.date
      : [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [destination, setDestination] = useState(
    location.state ? location.state.destination : "everywhere"
  );
  const [opendate, setOpenDate] = useState(false);
  const [openoptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(
    location.state ? location.state.options : null
  );
  const [danger, setDanger] = useState({
    adults: false,
    childrens: false,
    rooms: false,
  });
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/api/hotel?city=${destination}&limit=10`
  );
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
  const handelchange = () => {
    console.log("clicked");
    reFetch(
      `http://localhost:5000/api/hotel?&limit=10&min=${min || 0}&max=${
        max || 10000
      }`
    );
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
    }
  };
  return (
    <div>
      <Navbar />
      <Header search={false} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <div className="lsSearchItem">
                <FontAwesomeIcon className="search-logo" icon={faBed} />
                <input
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                  type="text"
                  value={destination || " "}
                  className="headerSearchInput"
                  placeholder="Where are you going ? "
                />
              </div>
            </div>
            <div className="lsItem">
              <div className="lsSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="search-logo"
                />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenDate((d) => !d);
                  }}
                >
                  {location.state
                    ? format(date[0].startDate, "MM/dd/yyyy") +
                      " to " +
                      format(date[0].endDate, "MM/dd/yyyy")
                    : format(new Date(), "MM/dd/yyyy") +
                      "to " +
                      format(new Date(), "MM/dd/yyyy")}
                </span>

                {opendate && (
                  <DateRange
                    className="newDate"
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                )}
              </div>
            </div>
            <div className="lsItem">
              <div className="lsSearchItem">
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
                  {`${options ? options.adults : 0} adults ${
                    options ? options.childrens : 0
                  } childrens ${options ? options.rooms : 0} rooms `}
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
                          {options ? options.adults : 1}
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
                          {options ? options.childrens : 1}
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
                          {options ? options.rooms : 1}
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
            </div>
            <div className="lsItem">
              <div className="input">
                <h4>Min price per night </h4>
                <input type="text" onChange={(e) => setMin(e.target.value)} />
              </div>
            </div>
            <div className="lsItem">
              <div className="input">
                <h4>Max price per night </h4>
                <input type="text" onChange={(e) => setMax(e.target.value)} />
              </div>
            </div>
            <div className="ssch">
              <button className="searchBtn" onClick={handelchange}>
                <FontAwesomeIcon className="search-btn-logo" icon={faSearch} />
                <span className="searchBtnSpan">Search</span>
              </button>
            </div>
          </div>
          <div className="listResult">
            {destination}
            {data.length > 0
              ? data.map((item) => <SearchItem item={item} key={item._id} />)
              : "no info for  " + destination}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
