import { useState } from "react";
import Main from "./components/Home/main";
import Modal from "./components/UI/modal";
import "./App.css";
import LoginForm from "./components/Auth/loginForm";
import RegisterForm from "./components/Auth/registerForm";
import Settings from "./components/Settings/settings";

function App() {
  const [visibleLoginModal, setLoginModalVisible] = useState(false);
  const [visibleRegisterModal, setRegisterModalVisible] = useState(false);
  const [visibleSettingsModal, setSettingsModalVisible] = useState(false);

  const openLoginModal = () => setLoginModalVisible(true);
  const openRegisterModal = () => setRegisterModalVisible(true);
  const openSettingsModal = () => setSettingsModalVisible(true);

  const closeLoginModal = () => setLoginModalVisible(false);
  const closeRegisterModal = () => setRegisterModalVisible(false);
  const closeSettingsModal = () => setSettingsModalVisible(false);

  return (
    <>
      {(visibleLoginModal || visibleRegisterModal || visibleSettingsModal) && (
        <div className="modal-backdrop"></div>
      )}
      {visibleLoginModal && (
        <Modal
          isOpen={visibleLoginModal}
          title="Login"
          onClose={closeLoginModal}
        >
          <LoginForm
            openRegisterModal={openRegisterModal}
            closeLoginModal={closeLoginModal}
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
          />
        </Modal>
      )}
      {visibleSettingsModal && (
        <Modal
          isOpen={visibleSettingsModal}
          title="Settings"
          onClose={closeSettingsModal}
        >
          <Settings />
        </Modal>
      )}
      <Main
        openLoginModal={openLoginModal}
        handleSettingsModal={openSettingsModal}
      />
    </>
  );
}

export default App;
