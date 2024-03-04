import { useState } from "react";
import classes from "./history.module.css";
import ImageList from "./imageList";
import { useEffect } from "react";

const HistoryTab = () => {
  const [imageList, setImageList] = useState([]);
  const [loadedImageData, setLoadedImageData] = useState({});
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const data = [
      {
        id: 1,
        imgName: "RBV logo",
        imgSrc:
          "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais",
        created: "12/12/2022",
      },
      {
        id: 2,
        imgName: "Freedom logo",
        imgSrc:
          "https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg",
        created: "2/3/2022",
      },
    ];
    setImageList(data);
    setLoadedImageData(data[0]);
    setActiveImage(data[0].imgName);
  }, []);

  const handleLoadImage = (e) => {
    setLoadedImageData(e);
    setActiveImage(e.imgName);
  };

  return (
    <>
      <ImageList
        imageList={imageList}
        handleLoadImage={handleLoadImage}
        activeImage={activeImage}
      />
      <div className="col d-flex flex-column justify-content-center align-items-center">
        <div className={`${classes.imageContainer} border border-3`}>
          {loadedImageData && (
            <img
              className={classes.brandImage}
              src={loadedImageData.imgSrc}
              alt="img-preview"
            />
          )}
        </div>
        <div className="w-100 d-flex me-5 mt-4 text-white fw-bolder justify-content-end">
          {loadedImageData.created}
        </div>
      </div>
    </>
  );
};

export default HistoryTab;
