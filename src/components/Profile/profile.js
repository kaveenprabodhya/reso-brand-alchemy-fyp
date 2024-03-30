const Profile = ({ user, handleLogout, isLoggedIn, closeProfileModal }) => {
  const logout = async () => {
    try {
      // Making the API request to the login endpoint
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        // Optionally, you could close the login modal and redirect the user
        localStorage.removeItem("access_token");
        handleLogout();
        closeProfileModal();
        // Redirect user or update UI accordingly
      } else {
        // Handle errors or unsuccessful login attempts
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during the logout process:", error);
    }

    // Update state or redirect to login page
  };
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
      <div className="d-flex justify-content-end">
        {isLoggedIn ? (
          <button
            className="btn text-white w-25 m-2"
            style={{ backgroundColor: "#6423CB", width: "130px" }}
            onClick={logout}
          >
            Logout
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
