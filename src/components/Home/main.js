import { useState } from "react";
import SideBar from "../Layout/sidebar";
import Home from "./home";
import HistoryTab from "../History/history";

const Main = ({ openLoginModal, handleSettingsModal }) => {
  const [homeClicked, setHome] = useState(true);
  const [historyClicked, setHistory] = useState(false);

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
      <div
        className="d-flex"
        style={{ height: "100vh", backgroundColor: "#9BACE4" }}
      >
        <SideBar
          handleAuthModal={openLoginModal}
          handleSettingsModal={handleSettingsModal}
          onHomeClick={onHomeClick}
          onHistoryClick={onHistoryClick}
        />
        {homeClicked && <Home />}
        {historyClicked && <HistoryTab />}
      </div>
    </>
  );
};

export default Main;
