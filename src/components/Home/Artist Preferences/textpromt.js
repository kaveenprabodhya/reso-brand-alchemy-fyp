import { useEffect, useRef, useState } from "react";

const TextPromptTab = ({
  handleOnBack,
  isLoading,
  isBrandCreated,
  handleSetIsLoading,
  handleSetBrandCreated,
  handleOnClickImg,
  handleSetImgSrc,
  isLoggedIn,
}) => {
  const [imgs, setImgs] = useState([]);
  const imgOneRef = useRef(null);
  const imgTwoRef = useRef(null);
  const imgThreeRef = useRef(null);
  const imgFourRef = useRef(null);
  const imgFiveRef = useRef(null);

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

  const handleCreateImage = () => {
    handleSetIsLoading(true);
    handleSetBrandCreated(true);

    const description =
      "Create a logo with named \"RBV\" incorporating a simple, yet futuristic font with harmonizing colors [red, blue]. Incorporate abstract shapes or symbols that subtly reference musical motifs such as sound waves, a stylized version of the artist's initials, or an emblem that captures the spirit of their music's ability to evoke deep emotional responses. The overall feel should be sleek, professional, and forward-thinking, appealing to a young, tech-savvy audience.";

    fetch("http://localhost:5000/api/image/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ text: description }),
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
        setImgs(data);
      })
      .catch((error) => {
        handleSetIsLoading(false);
        // toast.error("Error fetching your history. Please try again later.");
      });
  };

  const handleImgClick = (imgSrc) => {
    handleOnClickImg(true);
    handleSetImgSrc(imgSrc);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                  Create a logo with named{" "}
                  {
                    <input
                      type="text"
                      placeholder="Type Brand Name"
                      className="form-control"
                      style={{
                        display: "inline-block",
                        width: "auto",
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  incorporating a simple, yet futuristic font with harmonizing
                  colors [red, blue]. Incorporate abstract shapes or symbols
                  that subtly reference musical motifs such as sound waves, a
                  stylized version of the artist's initials, or an emblem that
                  captures the spirit of their music's ability to evoke deep
                  emotional responses. The overall feel should be sleek,
                  professional, and forward-thinking, appealing to a young,
                  tech-savvy audience.
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
