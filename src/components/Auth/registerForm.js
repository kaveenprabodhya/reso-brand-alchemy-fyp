const RegisterForm = ({ openLoginModal, closeRegisterModal }) => {
  const openModal = () => {
    closeRegisterModal();
    openLoginModal();
  };

  return (
    <>
      <form>
        <div class="row mb-3 g-3 align-items-center">
          <div class="col-auto">
            <label for="inputFirstName" class="col-form-label">
              First Name
            </label>
          </div>
          <div class="col-auto">
            <input type="text" id="inputFirstName" class="form-control" />
          </div>
          {/* <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div> */}
        </div>
        <div class="row mb-3 g-3 align-items-center">
          <div class="col-auto">
            <label for="inputLastName" class="col-form-label">
              Last Name
            </label>
          </div>
          <div class="col-auto">
            <input type="text" id="inputLastName" class="form-control" />
          </div>
          {/* <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div> */}
        </div>
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
          <label for="exampleInputPassword2" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div class="mb-3">
          Already haven an account?{" "}
          <button className="btn btn-outline-info" onClick={openModal}>
            Login here.
          </button>
        </div>
        <button type="submit" class="btn btn-primary d-flex ms-auto">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
