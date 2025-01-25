import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    const response = await fetch("https://code-note-backend.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      // props.showAlert("Account Ceated Successfully", "success");
      toast.success("Account Created Successfully");
    } else {
      // props.showAlert("Invalid Credentials", "danger");
      toast.error("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2" style={{width:"33%"}}>
      <h2 className="my-2">Sign up</h2>
      <form onSubmit={handleSubmit} className="border p-4 my-3 border-3 rounded-4">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            placeholder="John"
            name="name"
            type="text"
            className="form-control rounded-4"
            id="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            placeholder="mail@gmail.com"
            name="email"
            type="email"
            className="form-control rounded-4"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Min. 6 character"
            name="password"
            type="password"
            className="form-control rounded-4"
            id="password"
            onChange={onChange}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            placeholder="Min. 6 character"
            name="cpassword"
            type="password"
            className="form-control rounded-4"
            id="cpassword"
            onChange={onChange}
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-outline-success rounded-4">
          Create
        </button>
        <div className="mt-2">
          <Link to="/login" className="text-primary cursor-pointer">
            Already have an account ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
