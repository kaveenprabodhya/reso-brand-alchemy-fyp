import { useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextPromptTab = ({
  handleOnBack,
  isLoading,
  handleSetIsLoading,
  handleOnClickImg,
  handleSetImgSrc,
  color,
  emotionsWithColors,
}) => {
  const [imgs, setImgs] = useState([]);
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const imgThreeRef = useRef(null);
  const imgFourRef = useRef(null);
  const imgFiveRef = useRef(null);
  const [brandName, setBrandName] = useState("");
  const [isBrandCreated, setIsBrandCreated] = useState(false);

  const handleSetBrandCreated = (bool) => setIsBrandCreated(bool);

  useEffect(() => {
    if (
      imgs.length >= 0 &&
      imgOneRef.current &&
      imgTwoRef.current &&
      imgThreeRef.current &&
      imgFourRef.current &&
      imgFiveRef.current
    ) {
      imgOneRef.current.src = imgs[0];
      imgTwoRef.current.src = imgs[1];
      imgThreeRef.current.src = imgs[2];
      imgFourRef.current.src = imgs[3];
      imgFiveRef.current.src = imgs[4];
    }
  }, [imgs]);

  const getColors = () => {
    let allColors = [];
    Object.values(emotionsWithColors).forEach((color) => {
      if (!allColors.includes(color)) {
        allColors.push(color);
      }
    });
    if (color && !allColors.includes(color)) {
      allColors.push(color);
    }
    console.log(allColors);
    return allColors;
  };

  const handleCreateImage = () => {
    if (!brandName || brandName.length <= 0) {
      toast.error("Brand name is required.");
      return;
    }

    handleSetIsLoading(true);
    handleSetBrandCreated(true);

    fetch("http://localhost:5000/api/image/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ brandName: brandName, colors: getColors() }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch image history");
        }
      })
      .then((data) => {
        handleSetIsLoading(false);
        toast.success("Synthesizing Successful!");
        console.log(data.local_urls);
        setImgs(data.local_urls);
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      })
      .finally(() => {
        handleSetIsLoading(false);
      });
  };

  const handleImgClick = (imgSrc) => {
    handleOnClickImg(true);
    handleSetImgSrc(imgSrc);
  };

  return (
    <>
      {isLoading ? (
        // <ClockLoader color="#36D7B7" />
        <ClockLoader color="#ffffff" />
      ) : (
        <>
          <ToastContainer />
          {isBrandCreated ? (
            <div className="container">
              <div className="row my-3">
                <div className="col-12">
                  <img
                    ref={imgOneRef}
                    src={imgOneRef.current?.src}
                    alt=""
                    className="img-fluid"
                    onClick={() => handleImgClick(imgOneRef.current?.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <img
                    ref={imgTwoRef}
                    src={imgTwoRef.current?.src}
                    alt=""
                    className="img-fluid"
                    onClick={() => handleImgClick(imgTwoRef.current?.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="col">
                  <img
                    ref={imgThreeRef}
                    src={imgThreeRef.current?.src}
                    alt=""
                    className="img-fluid"
                    onClick={() => handleImgClick(imgThreeRef.current?.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <img
                    ref={imgFourRef}
                    src={imgFourRef.current?.src}
                    alt=""
                    className="img-fluid"
                    onClick={() => handleImgClick(imgFourRef.current?.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="col">
                  <img
                    ref={imgFiveRef}
                    src={imgFiveRef.current?.src}
                    alt=""
                    className="img-fluid"
                    onClick={() => handleImgClick(imgFiveRef.current?.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="me-auto">
                <button
                  className="btn mb-2 text-white"
                  style={{ backgroundColor: "#A753FB", width: "90px" }}
                  onClick={handleOnBack}
                >
                  <span>
                    <i className="fa fa-arrow-left" />
                  </span>{" "}
                  Back
                </button>
              </div>
              <div className="w-100 border" style={{ height: "auto" }}>
                <div
                  className="text-white m-3"
                  style={{ textAlign: "justify" }}
                >
                  <input
                    type="text"
                    placeholder="Type Brand Name"
                    className="form-control w-100"
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                      display: "inline-block",
                      width: "auto",
                      verticalAlign: "middle",
                    }}
                  />
                </div>
              </div>
              <div className="ms-auto">
                <button
                  className="btn mt-2 text-white"
                  style={{ backgroundColor: "#A753FB", width: "200px" }}
                  onClick={handleCreateImage}
                >
                  Generate
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TextPromptTab;
