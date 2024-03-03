const Profile = () => {
  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
          <div>First Name:</div>
          <div>Last Name: </div>
          <div>Email: </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-danger ms-auto">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
