import { useState } from "react";

const LoginForm = ({
  openRegisterModal,
  closeLoginModal,
  handleSetIsLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openModal = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPayload = {
      email,
      password,
    };

    try {
      // Making the API request to the login endpoint
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {
        // Handle successful login here
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("access_token", data.access_token);
        handleSetIsLogin();
        // Optionally, you could close the login modal and redirect the user
        closeLoginModal();
        // Redirect user or update UI accordingly
      } else {
        // Handle errors or unsuccessful login attempts
        console.error("Login failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during the login process:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          New to ResoBrandAlchemy?{" "}
          <button className="btn btn-outline-info" onClick={openModal}>
            Signup here.
          </button>
        </div>
        <button type="submit" className="btn btn-primary d-flex ms-auto">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
