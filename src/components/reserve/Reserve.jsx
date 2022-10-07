import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faColonSign } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import API from "../../apiUrl";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    API + `/api/rooms/roomsbyhotel/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const [isb, setIsb] = useState(false);

  const isadateAvailable = (startDate, endDate, room) => {
    const intdatelist = room.unavailableDates.map((date) =>
      new Date(date).getTime()
    );
    const sdate = new Date(startDate).getTime();
    const edate = new Date(endDate).getTime();

    const isit = intdatelist.filter((date) => {
      return date < edate && date > sdate;
    });

    return isit.length > 0;
  };

  const isAvailable = (roomNumber) => {
    const isFound = isadateAvailable(
      dates[0].startDate,
      dates[0].endDate,
      roomNumber
    );

    return !isFound;
  };
  /**
   
//

   const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
   */
  const handleSelect = (e, room) => {
    const checked = e.target.checked;
    const value = room;
    console.log(value);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item.numid !== value.numid)
    );
    console.log(selectedRooms);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    if (selectedRooms.length > 0) {
      const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
      alldates.map((d) => console.log(new Date(d)));
      try {
        await Promise.all(
          selectedRooms.map((room) => {
            const res = axios.put(
              `${API}/api/rooms/roomunvailablity/${room.roomId}?numberId=${room.numid}`,
              {
                dates: alldates,
              }
            );
            console.log(room);

            return res.data;
          })
        );
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/hotel/select/" + hotelId);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {loading
          ? "loading ..."
          : data.length > 0
          ? data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={item._id}
                        onChange={(e) => {
                          handleSelect(e, {
                            numid: roomNumber._id,
                            roomId: item._id,
                          });
                        }}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          : "no rooms"}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
