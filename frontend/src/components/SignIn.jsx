import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="m-5 p-5 mx-auto mt-40 w-[350px] h-[400px] shadow-xl bg-slate-50 rounded-xl">
      <div className="text-center text-4xl font-bold mb-5">Sign In</div>
      <p className="text-xl text-center">
        Enter your credentials to access your account
      </p>
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
            const resp = await axios.post(
              "http://localhost:5000/api/v1/user/signin",
              {
                username,
                password,
              }
            );
            console.log(resp)
            if (resp.status == 200) {
              localStorage.setItem("token", resp.data.token);
              localStorage.setItem('urll', resp.data.urll);
              navigate("/dashboard");
            }
          } catch (error) {
            console.error("Error during sign in:", error);
          }
        }}
        className="mb-2 w-full px-10 py-2 bg-black text-white rounded-lg"
      >


        Sign In
      </button>
      <p className="font-medium text-center">
        Dont't have an account?
        <Link to={"/"}>
          <u>Sign Up</u>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

