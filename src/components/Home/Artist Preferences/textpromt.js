const TextPromptTab = ({ handleOnBack }) => {
  return (
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
      <div className="w-100 border" style={{ height: "330px" }}></div>
      <div className="ms-auto">
        <button
          className="btn mt-2 text-white"
          style={{ backgroundColor: "#A753FB", width: "200px" }}
        >
          Generate
        </button>
      </div>
    </>
  );
};

export default TextPromptTab;
