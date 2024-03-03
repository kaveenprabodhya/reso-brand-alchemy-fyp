const LoginForm = ({ openRegisterModal, closeLoginModal }) => {
  const openModal = () => {
    closeLoginModal();
    openRegisterModal();
  };

  return (
    <>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3">
          New to ResoBrandAlchemy?{" "}
          <button className="btn btn-outline-info" onClick={openModal}>
            Signup here.
          </button>
        </div>
        <button type="submit" class="btn btn-primary d-flex ms-auto">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
