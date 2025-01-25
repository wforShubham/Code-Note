import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const createaccount = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      // props.showAlert("Logged in Successfully", "success");
      toast.success("Logged in Successfully");
    } else {
      // props.showAlert("Invalid Details", "danger");
      toast.error("Invalid Details");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3 my-50" style={{ width: "33%" }}>
      <h2 >Log in</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 my-3 border-3 rounded-4"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            placeholder="mail@example.com"
            onChange={onChange}
            value={credentials.email}
            type="email"
            className="form-control rounded-4"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Min. 6 character"
            value={credentials.password}
            type="password"
            className="form-control rounded-4"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-success rounded-4">
          Login
        </button>
        <div className="mt-2">
          <Link to="/signup" className="text-primary cursor-pointer">
            Create an account ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
