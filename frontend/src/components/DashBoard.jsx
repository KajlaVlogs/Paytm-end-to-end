import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";
import QRCode from 'react-qr-code';


const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState([]);
  // const [showBalance, setShowBalance] = useState(false);
  const [urll, setUrll] = useState(''); // State to store the URL from localStorage
  const [showQRPopup, setShowQRPopup] = useState(false); // State to control visibility of QR popup

  useEffect(() => {
    // Retrieve the stored URL from localStorage
    const storedUrll = localStorage.getItem('urll');
    if (storedUrll) {
      setUrll(storedUrll);
    }}, []);
    

    // Fetch users based on filter
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
          setUsers(response.data.user);
        });
    }, [filter]);

    useEffect(() => {
      axios
        .get("http://localhost:5000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
        });
    }, []);

    const [showBalance, setShowBalance] = useState(false);


    const toggleBalanceVisibility = () => {
      setShowBalance(!showBalance);
    };
  

  const openQRPopup = () => {
    setShowQRPopup(true);
  };

  const closeQRPopup = () => {
    setShowQRPopup(false);
  };

  const handleScanQR = () => {
    window.location.href = "https://qrcodescan.in/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="w-full flex justify-between items-center bg-blue-600 text-white p-4 rounded-md shadow-md">
        <b className="text-2xl">PayTM App</b>
      </div>

      <div className="mt-6 p-4 bg-white rounded-md shadow-md">
        <div className="text-lg font-semibold text-gray-700">
          {/* Your balance: <span className="text-blue-600">Rs {Math.floor(balance)}</span> */}
          Your balance: <span className="text-blue-600 ml-2">{showBalance ? `Rs ${Math.floor(balance)}` : '*****'}</span>
        <button 
          onClick={toggleBalanceVisibility} 
          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-md">
          {showBalance ? 'Hide Balance' : 'Show Balance'}
        </button>
        </div>
      </div>


      <div className="mt-6 p-4 bg-white rounded-md shadow-md">
        <div className="text-lg font-semibold text-gray-700 mb-4">Users</div>
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search User"
          className="rounded-lg p-2 w-full mb-4 border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id}>
              <User user={user} />
            </div>
          ))}
        </div>
      </div>

      {/* Button to show QR Code */}
      <button
        onClick={openQRPopup}
        className="fixed bottom-4 right-30 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
      >
        Show QR
      </button>

      {/* Button to scan QR */}
      <button
        onClick={handleScanQR}
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
      >
        Scan QR
      </button>

      {/* QR Code Popup */}
      {showQRPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md relative">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Show Your QR</h2>
            <QRCode value={urll} />
            <button
              onClick={closeQRPopup}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
  
    </div>
  );
};

export default DashBoard;
