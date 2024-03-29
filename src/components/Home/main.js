import { useEffect, useState } from "react";
import SideBar from "../Layout/sidebar";
import Home from "./home";
import HistoryTab from "../History/history";
import Modal from "../UI/modal";
import LoginForm from "../Auth/loginForm";
import RegisterForm from "../Auth/registerForm";
import Settings from "../Settings/settings";
import Profile from "../Profile/profile";
import "./main.css";
import { jwtDecode } from "jwt-decode";

const Main = () => {
  const [homeClicked, setHome] = useState(true);
  const [historyClicked, setHistory] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visibleLoginModal, setLoginModalVisible] = useState(false);
  const [visibleRegisterModal, setRegisterModalVisible] = useState(false);
  const [visibleSettingsModal, setSettingsModalVisible] = useState(false);
  const [visibleProfileModal, setProfileModalVisible] = useState(false);
  const [user, setUser] = useState({});

  const openLoginModal = () => {
    if (visibleRegisterModal) setRegisterModalVisible(false);
    setLoginModalVisible(true);
  };
  const openRegisterModal = () => {
    if (visibleLoginModal) setLoginModalVisible(false);
    setRegisterModalVisible(true);
  };
  const openSettingsModal = () => setSettingsModalVisible(true);
  const openProfileModal = () => setProfileModalVisible(true);

  const closeLoginModal = () => setLoginModalVisible(false);
  const closeRegisterModal = () => setRegisterModalVisible(false);
  const closeSettingsModal = () => setSettingsModalVisible(false);
  const closeProfileModal = () => setProfileModalVisible(false);

  const handleSetIsLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsLoggedIn(false);
        // Optional: Redirect to login or perform additional cleanup
        return false; // Token is not present
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        logoutUser();
        return false; // Token has expired
      }

      // Token is valid
      setIsLoggedIn(true);
      setUser({
        firstName: decodedToken.first_name,
        lastName: decodedToken.last_name,
        email: decodedToken.email,
      });
      return true; // Token is valid and active
    };

    // Function to log out user
    const logoutUser = () => {
      localStorage.removeItem("access_token"); // Remove token from localStorage
      setIsLoggedIn(false);
      setUser({}); // Clear user state
      // Optional: Redirect to login
    };

    // Initial check on component mount
    checkTokenExpiration();

    // Set an interval to check token expiration periodically
    // This interval checks every minute (60000 milliseconds)
    const intervalId = setInterval(checkTokenExpiration, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  const onHomeClick = () => {
    setHistory(false);
    setHome(true);
  };

  const onHistoryClick = () => {
    setHome(false);
    setHistory(true);
  };

  return (
    <>
      {(visibleLoginModal ||
        visibleRegisterModal ||
        visibleSettingsModal ||
        visibleProfileModal) && <div className="modal-backdrop"></div>}
      {visibleLoginModal && (
        <Modal
          isOpen={visibleLoginModal}
          title="Login"
          onClose={closeLoginModal}
        >
          <LoginForm
            openRegisterModal={openRegisterModal}
            closeLoginModal={closeLoginModal}
            handleSetIsLogin={handleSetIsLogin}
          />
        </Modal>
      )}
      {visibleRegisterModal && (
        <Modal
          isOpen={visibleRegisterModal}
          title="Register"
          onClose={closeRegisterModal}
        >
          <RegisterForm
            openLoginModal={openLoginModal}
            closeRegisterModal={closeRegisterModal}
            handleSetIsLogin={handleSetIsLogin}
          />
        </Modal>
      )}
      {visibleSettingsModal && (
        <Modal
          isOpen={visibleSettingsModal}
          title="Settings"
          onClose={closeSettingsModal}
          padding="0"
        >
          <Settings
            handleLogout={handleLogOut}
            isLoggedIn={isLoggedIn}
            closeSettingsModal={closeSettingsModal}
          />
        </Modal>
      )}
      {visibleProfileModal && (
        <Modal
          isOpen={visibleProfileModal}
          title="Profile"
          onClose={closeProfileModal}
          padding="0"
        >
          <Profile
            user={user}
            handleLogout={handleLogOut}
            isLoggedIn={isLoggedIn}
            closeProfileModal={closeProfileModal}
          />
        </Modal>
      )}
      <div
        className="d-flex"
        style={{ height: "100vh", backgroundColor: "#9BACE4" }}
      >
        <SideBar
          handleAuthModal={openLoginModal}
          handleSettingsModal={openSettingsModal}
          onHomeClick={onHomeClick}
          onHistoryClick={onHistoryClick}
          handleProfileModal={openProfileModal}
          isLoggedIn={isLoggedIn}
          user={user}
        />
        {homeClicked && <Home isLoggedIn={isLoggedIn} />}
        {historyClicked && <HistoryTab isLoggedIn={isLoggedIn} />}
      </div>
    </>
  );
};

export default Main;
