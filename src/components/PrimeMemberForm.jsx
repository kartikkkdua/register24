import React, { useState } from "react";
import logo from "./logo (1).png"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [receiptIdError, setReceiptIdError] = useState("");
  const navigate = useNavigate();

  const handlePayCashClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setReceiptIdError(""); // Reset error when closing the popup
  };

  const handleSubmit = () => {
    if (receiptId.trim() === "") {
      setReceiptIdError("Receipt ID is required.");
    } else {
      console.log("Receipt ID Submitted:", receiptId);
      setShowPopup(false);
      navigate("/success"); // Redirect to /success
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center max-w-2xl w-full mx-4 pt-3 pb-3">
      <img 
      src={logo}
      alt="logo"
      className="mb-4 h-16 w-auto mx-auto my-auto" // Adjust height and other styles as needed
      />
        <h2 className="text-2xl font-semibold mb-4">Prime Member Registration</h2>
        <form className="text-gray-700 flex flex-wrap justify-between">
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="dob" className="block text-sm font-medium">
              DOB
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="email" className="block text-sm font-medium">
              College Email
            </label>
            <input
              type="email"
              id="collegeEmail"
              name="email"
              placeholder="Enter your college email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Personal Email
            </label>
            <input
              type="email"
              id="personalemail"
              name="email"
              placeholder="Enter your personal email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone (WhatsApp)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="sapId" className="block text-sm font-medium">
              SAP ID
            </label>
            <input
              type="text"
              id="sapId"
              name="sapId"
              placeholder="Enter your SAP ID"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="sapId" className="block text-sm font-medium">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter your Department"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="course" className="block text-sm font-medium">
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              placeholder="Enter your course"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="degree" className="block text-sm font-medium">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              placeholder="Enter your degree"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label
              htmlFor="degreeStartYear"
              className="block text-sm font-medium"
            >
              Degree Start Year
            </label>
            <select
              id="degreeStartYear"
              name="degreeStartYear"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2023">2024</option>

            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label
              htmlFor="degreeEndYear"
              className="block text-sm font-medium"
            >
              Degree End Year
            </label>
            <select
              id="degreeEndYear"
              name="degreeEndYear"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2027">2028</option>
              <option value="2027">2029</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="currentYear" className="block text-sm font-medium">
              Current Year
            </label>
            <select
              id="currentYear"
              name="currentYear"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label
              htmlFor="membershipPeriod"
              className="block text-sm font-medium"
            >
              Membership Period
            </label>
            <select
              id="membershipPeriod"
              name="membershipPeriod"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
            </select>
          </div>
          <div className="mb-4 w-2/3 px-2">
            <label htmlFor="degree" className="block text-sm font-medium">
              Coupon Code
            </label>
            <input
              type="text"
              id="coupon code"
              name="coupon code"
              placeholder="Enter your coupon code"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-1/3 px-2 mb-2 mt-5">
            <input
              type="button"
              value="Apply"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>

          <div className="w-1/2 px-2 mb-4">
            <input
              type="button"
              value="Pay Cash"
              onClick={handlePayCashClick}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>
          <div className="w-1/2 px-2 mb-4">
            <input
              type="button"
              value="Pay Online"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>
          {/* Popup Modal */}
      {/* Popup Modal */}
      {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Enter Receipt ID</h3>
                <input
                  type="text"
                  id="receiptId"
                  value={receiptId}
                  onChange={(e) => setReceiptId(e.target.value)}
                  placeholder="Enter your Receipt ID"
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
                {receiptIdError && (
                  <p className="text-red-500 text-sm mb-4">{receiptIdError}</p>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handlePopupClose}
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
            </div>
          </div>
        </div>
      )}
        </form>
      </div>
    </div>
  );
}

export default Register;