import './mini-tabview.css'

const ControlsTab = () => {
  return (
    <>
    <div className="d-flex justify-content-between my-3 align-items-center">
        <div>Export Data</div>
        <button className="btn btn-primary">Export</button>
      </div>
      <div className="horizontal-separator"></div>
      <div className="d-flex justify-content-between my-3 align-items-center">
        <div>Delete your account</div>
        <button className="btn btn-danger">Delete</button>
      </div>
    </>
  );
};

export default ControlsTab;
