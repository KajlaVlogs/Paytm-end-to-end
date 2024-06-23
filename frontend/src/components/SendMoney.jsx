import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate()
  const id = search.get("id");
  const firstName = search.get("firstName");
  const lastName = search.get("lastName");
  const [amount, setAmount] = useState();
  //   console.log(id, firstName, lastName);
  return (
    <div className="m-5 p-5 mx-auto mt-40 w-[350px] h-[320px] shadow-xl bg-slate-50 rounded-xl">
      <div className="text-center text-4xl font-bold mb-10">Send Money </div>
      <div className="font-semibold text-2xl">
        {" "}
        {firstName} {lastName}{" "}
      </div>
      <div className="font-medium mb-5">Amount (in Rs)</div>
      <input
        onChange={(e) => setAmount(e.target.value)}
        type="text"
        placeholder="Enter Amount"
        className="p-2 w-full bg-slate-50 border border-black rounded-lg mb-7"
      />
      <button
        onClick={() => {
          const resp = axios.post(
            "http://localhost:5000/api/v1/account/transfer",
            {
              amount: Number(amount),
              to: id,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (resp) {
            console.log("successful yay :)");
            navigate('/dashboard')
          }
          
        }}
        className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none"
      >
        Initiate Transfer
      </button>
    </div>
  );
};

export default SendMoney;
