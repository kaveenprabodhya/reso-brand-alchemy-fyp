const TextPromptTab = ({
  handleOnBack,
  isLoading,
  isBrandCreated,
  handleSetIsLoading,
  handleSetBrandCreated,
  handleOnClickImg,
  handleSetImgSrc,
}) => {
  const handleCreateImage = () => {
    handleSetIsLoading(true);
    handleSetBrandCreated(true);
    setTimeout(() => {
      handleSetIsLoading(false);
      handleSetImgSrc(
        "https://mbluxury1.s3.amazonaws.com/2022/02/25172616/chanel-1.jpg"
      );
    }, 3000);
  };

  const handleImgClick = () => {
    handleOnClickImg(true);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isBrandCreated ? (
            <div className="m-2 border">
              <img
                src="https://mbluxury1.s3.amazonaws.com/2022/02/25172616/chanel-1.jpg"
                alt=""
                className="w-100 h-100"
                onClick={handleImgClick}
              />
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
