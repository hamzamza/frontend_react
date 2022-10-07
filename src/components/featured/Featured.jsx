import API from "../../apiUrl";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
const Featured = () => {
  const { data, loading, error } = useFetch(
    API + "/api/hotel/countByCity?cities=aoulouz,taroudant,agadir"
  );

  return (
    <>
      {loading ? (
        "loading ... "
      ) : (
        <div className="featured">
          <div className="featuredItem">
            <img src={data[0].imgsrc} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>{data[0].city}</h1>
              <h2> {data[0].number} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src={data[1].imgsrc} alt="" className="featuredImg" />

            <div className="featuredTitles">
              <h1>{data[1].city}</h1>
              <h2> {data[1].number} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={data[2].imgsrc} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>{data[2].city}</h1>
              <h2> {data[2].number} properties</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Featured;
