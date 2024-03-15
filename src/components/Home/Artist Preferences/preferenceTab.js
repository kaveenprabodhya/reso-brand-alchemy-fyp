import classes from "./artistpreference.module.css";
import PickColor from "../colorpicker";

const PreferencesTab = ({ emotions, color, handleSetColor, handleOnNext }) => {
  return (
    <>
      <div
        className="bg-white mt-2"
        style={{ width: "100%", height: "50%", overflowY: "auto" }}
      >
        <div className="bg-secondary w-100 my-2 py-1 opacity-50 text-white">
          <div className="ps-2 pt-2">Emotions Captured</div>
          <div className={classes.horizontalSeparator}></div>
          <div
            className="my-2 mx-2"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              height: "100%",
            }}
          >
            {Object.keys(emotions).length <= 0 && (
              <div className="d-flex border justify-content-center align-items-center">
                No emotions captured.
              </div>
            )}
            <ul className="list-group list-group-flush rounded">
              {Object.entries(emotions).map(([emotion, color], index) => (
                <li className="list-group-item" key={index}>
                  {emotion}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`bg-secondary w-100 my-2 py-1 opacity-50 text-white`}>
          <div className="ps-2 pt-2">Recommended Colors</div>
          <div className={classes.horizontalSeparator}></div>
          <div
            className="px-2"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              height: "100%",
            }}
          >
            {Object.keys(emotions).length <= 0 ? (
              <div className="d-flex border justify-content-center align-items-center">
                No color suggestions.
              </div>
            ) : (
              <div className="d-flex flex-wrap">
                {Object.entries(emotions).map(([emotion, color], index) => (
                  <div
                    className="bg-white d-flex align-items-center justify-content-center"
                    style={{
                      height: "75px",
                      width: "75px",
                      margin: "2px",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                        width: "68px",
                        height: "68px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={`bg-secondary w-100 my-2 opacity-50 text-white`}>
          <div className="ps-2 pt-2">Additional Colors</div>
          <div className={classes.horizontalSeparator}></div>
          <div className="py-2 ps-2">
            <PickColor color={color} handleSetColor={handleSetColor} />
          </div>
        </div>
      </div>
      <div className="ms-auto">
        <button
          className="btn mt-4 text-white"
          style={{ backgroundColor: "#A753FB", width: "90px" }}
          onClick={handleOnNext}
          disabled={Object.keys(emotions).length === 0}
        >
          Next{" "}
          <span>
            <i className="fa fa-arrow-right" />
          </span>
        </button>
      </div>
    </>
  );
};

export default PreferencesTab;
