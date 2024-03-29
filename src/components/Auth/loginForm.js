import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation schema
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import css for react-toastify

// Validation schema
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = ({
  openRegisterModal,
  closeLoginModal,
  handleSetIsLogin,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success("Login successful!");
          localStorage.setItem("access_token", data.access_token);
          handleSetIsLogin();
          closeLoginModal();
        } else {
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        toast.error("Error during the login process. Please try again later.");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          New to ResoBrandAlchemy?{" "}
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={openRegisterModal}
          >
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
