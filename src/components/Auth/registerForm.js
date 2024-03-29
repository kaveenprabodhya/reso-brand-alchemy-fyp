import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation schema
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import css for react-toastify

// Validation schema
const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = ({
  openLoginModal,
  closeRegisterModal,
  handleSetIsLogin,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      // Simulate a registration API call
      console.log("Registration values:", values);
      // Here, integrate the API request for registration
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("Registration successful!");
          localStorage.setItem("access_token", data.access_token);
          closeRegisterModal();
          handleSetIsLogin();
        } else {
          toast.error(
            "Registration failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        // Simulate API error response
        toast.error(
          "Error during the registration process. Please try again later."
        );
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-3 g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputFirstName" className="col-form-label">
              First Name
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="inputFirstName"
              className="form-control"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-danger">{formik.errors.firstName}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputLastName" className="col-form-label">
              Last Name
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="inputLastName"
              className="form-control"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-danger">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
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
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-danger">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div className="mb-3">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={openLoginModal}
          >
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
