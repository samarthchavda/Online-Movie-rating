import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./loginPage.css";
import axios from "axios";
import * as icons from "react-icons/io5";

function LoginPage() {
  const [isOption, setOption] = useState("login");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    Fname: "",
    lastName: "",
  });

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  }, [isOption]);

  const { email, password, confirmPassword, firstName, lastName } = formData;

  const toggleOption = (option) => {
    setOption(option);
  };

  const handleError = (err) => {
    setError(err);
    console.log(err);
  };

  const handleSuccess = (msg) => {
    setSuccess(msg);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const confirmPasswordMatchPassword = password === confirmPassword;

    if (isOption === "login") {
      if (!email || !password) {
        handleError("email and password cannot be empty");
        return false;
      } else return true;
    } else if (isOption === "signin") {
      if (!email || !password || !firstName || !lastName) {
        handleError("All fields are required");
        return false;
      }
      if (!emailRegex.test(email)) {
        handleError("Invalid email format");
        return false;
      }

      if (!confirmPasswordMatchPassword) {
        handleError("Password and confirm password must match");
        return false;
      }
      if (!/(?=.*[a-z])/.test(confirmPassword)) {
        handleError("Password must contain at least one lowercase letter");
        return false;
      }

      if (!/(?=.*[A-Z])/.test(confirmPassword)) {
        handleError("Password must contain at least one uppercase letter");
        return false;
      }

      if (!/(?=.*[0-9])/.test(confirmPassword)) {
        handleError("Password must contain at least one number");
        return false;
      }

      if (!/(?=.*[!@#$%^& *])/.test(confirmPassword)) {
        handleError("Password must contain at least one special character");
        return false;
      }

      if (!/(?=.{8,12})/.test(confirmPassword)) {
        handleError("Password must be between 8 to 12 characters long");
        return false;
      } else return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOption === "login") {
      if (validateForm()) {
        try {
          const { data } = await axios.post(
            "http://localhost:8989/login",
            {
              ...formData,
            },
            { withCredentials: true }
          );
          console.log(data);
          const { success, message } = data;
          if (success) {
            handleSuccess("login successfully");
            setError("");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setFormData({
          ...formData,
          email: "",
          password: "",
        });
      }
    } else {
      if (validateForm()) {
        try {
          const { data } = await axios.post(
            "http://localhost:8989/signup",
            {
              ...formData,
            },
            {
              withCredentials: true,
            }
          );
          const { success, message } = data;
          if (success) {
            handleSuccess("login successfully");
            setError("");
            setTimeout(() => {
              navigate("/");
            }, 500);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setFormData({
          ...formData,
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <>
      <div className="container-login">
        {isOption === "login" && <div className="text-login">Login</div>}
        {isOption === "signin" && <div className="text-login">Sign Up</div>}

        <div className="form-login">
          <form onSubmit={handleSubmit}>
            {isOption === "signin" && (
              <div className="name-box-login">
                <div className="fname-login">
                  <label className="label-login">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="name login-input text-upper"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="fname-login">
                  <label className="label-login">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="name login-input text-upper"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <label className="label-login">Email</label>
            <input
              type="text"
              placeholder="example@example.com"
              className="login-input username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
            <label className="label-login">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              className="login-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {isOption === "signin" && (
              <>
                <label className="label-login">Confirm Password</label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  className="login-input"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </>
            )}
            <button className="btn-login" id="continue" onClick={handleSubmit}>
              Continue
            </button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        </div>

        <div className="newUser-login">
          {isOption === "login" && (
            <>
              New user?
              <span
                className="link-login"
                onClick={() => toggleOption("signin")}
              >
                Create an account
              </span>
            </>
          )}
          {isOption === "signin" && (
            <>
              Already have an account?
              <span
                className="link-login"
                onClick={() => toggleOption("login")}
              >
                Sign in
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
