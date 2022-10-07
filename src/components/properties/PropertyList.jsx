import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import API from "../../apiUrl";

const PropertyList = () => {
  const { data, loading, error } = useFetch(API + "/api/hotel/countByType");
  return (
    <>
      {loading ? (
        "loading ..."
      ) : (
        <div className="pList">
          <div className="pListItem">
            <img
              src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{data[0].type}</h1>
              <h2>
                {data[0].number} {data[0].type}1
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{data[1].type}</h1>
              <h2>
                {data[1].number} {data[1].type}
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{data[2].type}</h1>
              <h2>
                {data[2].number} {data[2].type}
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{data[3].type}</h1>
              <h2>
                {data[3].number} {data[3].type}
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{data[4].type}</h1>
              <h2>
                {data[4].number} {data[4].type}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyList;
