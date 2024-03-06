import "./mini-tabview.css";

const GeneralTab = () => {
  return (
    <>
      <div className="d-flex justify-content-between my-3 align-items-center">
        <div>Theme</div>
        <button className="btn btn-primary">System</button>
      </div>
      <div className="horizontal-separator"></div>
      <div className="d-flex justify-content-between my-3 align-items-center">
        <div>Delete all images</div>
        <button className="btn btn-danger">Delete All</button>
      </div>
    </>
  );
};

export default GeneralTab;
