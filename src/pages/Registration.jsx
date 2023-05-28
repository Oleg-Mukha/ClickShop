import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Registration = () => {
  const navigate = useNavigate("");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .max(40, "Last name cannot exceed 40 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
        "Password must contain at least 1 capital letter and 1 non-alphanumeric character"
      )
      .required("Password is required"),
  });

  const handleSubmit = (values, {resetForm} ) => {
    console.log(values);
    alert("Registration successful!");
    resetForm();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen f">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Click Shop
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
      >
        <Form className="flex flex-col">
          <div className="flex my-3">
            <label htmlFor="firstName" className="w-1/3">
              First Name:
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="w-2/3 border border-gray-400 p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 font-medium"
            />
          </div>

          <div className="flex my-3">
            <label htmlFor="lastName" className="w-1/3">
              Last Name:
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="w-2/3 border border-gray-400 p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 font-medium"
            />
          </div>

          <div className="flex my-3">
            <label htmlFor="email" className="w-1/3">
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-2/3 border border-gray-400 p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 font-medium"
            />
          </div>

          <div className="flex my-3">
            <label htmlFor="password" className="w-1/3">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-2/3 border border-gray-400 p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 font-medium"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
