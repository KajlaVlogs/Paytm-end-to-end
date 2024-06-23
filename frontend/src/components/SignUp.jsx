import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="m-5 p-5 mx-auto mt-20 w-[350px] h-[580px] shadow-xl bg-slate-50 rounded-xl">
      <div className="text-center text-4xl font-bold mb-5">Sign Up</div>
      <p className="text-xl text-center">
        Enter your information to create an account
      </p>
      <div>
        <b>First Name </b> <br />
        <input
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-slate-50 my-3 p-2 rounded-lg border w-full"
          type="text"
          placeholder="John"
        />
      </div>
      <div>
        <b>Last Name </b> <br />
        <input
          onChange={(e) => setLastName(e.target.value)}
          className="bg-slate-50 my-3 p-2 rounded-lg border w-full"
          type="text"
          placeholder="Doe"
        />
      </div>
      <div>
        <b>Email</b> <br />
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="bg-slate-50 my-3 p-2 rounded-lg border w-full"
          type="email"
          placeholder="johndoe@example.com"
        />
      </div>
      <div>
        <b>Password</b> <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-50 my-3 p-2 rounded-lg border w-full"
          type="password"
        />
      </div>

      <button
        onClick={async () => {
          try {
            const response = await axios.post(
              "http://localhost:5000/api/v1/user/signup",
              {
                firstName,
                lastName,
                username,
                password,
              }
            );

            if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              console.log(response);
              console.log(response.data.token);
              navigate("/signin");
            }
          } catch (error) {
            console.error("Error during sign up:", error);
          }
        }}
        className="mb-2 w-full px-10 py-2 bg-black text-white rounded-lg"
      >
        Sign Up
      </button>

      <p className="font-medium text-center">
        Already have an account?{" "}
        <Link to={"/signin"}>
          <u>Login</u>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
