const RegisterForm = ({ openLoginModal, closeRegisterModal }) => {
  const openModal = () => {
    closeRegisterModal();
    openLoginModal();
  };

  return (
    <>
      <form>
        <div className="row mb-3 g-3 align-items-center">
          <div className="col-auto">
            <label for="inputFirstName" className="col-form-label">
              First Name
            </label>
          </div>
          <div className="col-auto">
            <input type="text" id="inputFirstName" className="form-control" />
          </div>
          {/* <div className="col-auto">
            <span id="passwordHelpInline" className="form-text">
              Must be 8-20 characters long.
            </span>
          </div> */}
        </div>
        <div className="row mb-3 g-3 align-items-center">
          <div className="col-auto">
            <label for="inputLastName" className="col-form-label">
              Last Name
            </label>
          </div>
          <div className="col-auto">
            <input type="text" id="inputLastName" className="form-control" />
          </div>
          {/* <div className="col-auto">
            <span id="passwordHelpInline" className="form-text">
              Must be 8-20 characters long.
            </span>
          </div> */}
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div className="mb-3">
          Already haven an account?{" "}
          <button className="btn btn-outline-info" onClick={openModal}>
            Login here.
          </button>
        </div>
        <button type="submit" className="btn btn-primary d-flex ms-auto">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
