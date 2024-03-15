const Profile = ({ user }) => {
  return (
    <>
      <div className="row" style={{ height: "150px" }}>
        <div className="col-3 d-flex align-items-center justify-content-center">
          <span>
            <i className="fa fa-user-circle-o" style={{ fontSize: "72px" }}></i>
          </span>
        </div>
        <div className="col d-flex align-items-center">
          <div>
            <div className="pb-2">First Name: {user?.firstName}</div>
            <div className="pb-2">Last Name: {user?.lastName}</div>
            <div className="pb-2">Email: {user?.email}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
