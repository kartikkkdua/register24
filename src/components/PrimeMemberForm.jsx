import React, { useState, useEffect } from "react";
import logo from "./logo (1).png"
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { userValidator } from "../userValidator";


const Register = ({ onClose }) => {
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

  // Initialize state variables for each form field
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [sapId, setSapId] = useState("");
  const [course, setCourse] = useState("");
  const [degree, setDegree] = useState("");
  const [degreeStartYear, setDegreeStartYear] = useState("");
  const [degreeEndYear, setDegreeEndYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [membershipPeriod, setMembershipPeriod] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateDiscount = () => {
    const amt = totalAmount * 0.75 
    const discount = Math.floor(amt / 10) * 10;
    console.log(discount)
    return discount;
  }

  useEffect(() => {
    switch (membershipPeriod) {
      case "1":
        setTotalAmount(375);
        break;
      case "2":
        setTotalAmount(500);
        break;
      case "3":
        setTotalAmount(700);
        break;
      case "4":
        setTotalAmount(800);
        break;
      default:
        setTotalAmount(0);
    }
  }, [membershipPeriod]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !dob ||
      !gender ||
      !email ||
      !phoneNumber ||
      !collegeEmail ||
      !department ||
      !sapId ||
      !course ||
      !degree ||
      !degreeStartYear ||
      !degreeEndYear ||
      !currentYear ||
      !membershipPeriod
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    const formData = {
      name,
      dob,
      gender,
      email,
      phoneNumber,
      sapId,
      course,
      degree,
      degreeStartYear,
      degreeEndYear,
      currentYear,
      membershipPeriod,
      coupon,
      collegeEmail,
      department,
    };
    const validate = userValidator.safeParse({ phoneNumber});
    if (!validate.success) {
      alert(validate.error.errors[0].message);
      return;
    }

    console.log("Form Data Submitted: ", formData);

    const res = await axios.post('https://yugmak24.el.r.appspot.com/api/v1/createOrder', {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "receipt#1",
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      })

    console.log(res.data);

    const { id, amount, key_id, description } = res.data;

    const options = {
      key: key_id,
      amount: amount * 100,
      currency: "INR",
      name: "YUGMAK 2024",
      description: description,
      order_id: id,
      handler: async function (response) {
        try {
          const verifyResponse = await axios.post(
            `https://yugmak24.el.r.appspot.com/api/v1/prime/register`,
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              fullName: name,
              dateOfBirth: dob,
              gender,
              personalEmail: email,
              phoneNumber,
              sapId,
              collegeEmail: collegeEmail,
              course,
              department,
              degree,
              graduationStartYear: degreeStartYear,
              graduationEndYear: degreeEndYear,
              graduationCurrentYear: currentYear,
              membershipPeriod,
              coupon,
              transactionId: response.razorpay_payment_id
            },
            {
              headers: {
                "Content-Type": "application/json",
                signature: response.razorpay_signature,
              },
            }
          );

          if (verifyResponse.data.success) {
            navigate("/success", {
              state: {
                transactionId: response.razorpay_payment_id,
                totalAmount: amount
              }
            }); // Redirect to /success
          } else {
            alert(
              verifyResponse.data.message ||
              "Payment verification failed. Please try again."
            );
          }
        } catch (verifyError) {
          console.log(
            "Error during payment verification:",
            verifyError.response || verifyError.message || verifyError
          );
          alert(
            "Error during payment verification:",
            verifyError.response || verifyError.message || verifyError
          );
        }
      },
      prefill: {
        name,
        email: email,
        contact: phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleCouponApply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://yugmak24.el.r.appspot.com/api/v1/prime/applyCoupon', {
        couponCode: coupon,
        phoneNumber
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })

      console.log(res.data);

      if (res.data.success) {
        alert("Coupon Applied Successfully!");
        setTotalAmount(calculateDiscount());
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error applying coupon. Please try again.");
    }
  }

  const handlePayCash = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !dob ||
      !gender ||
      !email ||
      !phoneNumber ||
      !collegeEmail ||
      !department ||
      !sapId ||
      !course ||
      !degree ||
      !degreeStartYear ||
      !degreeEndYear ||
      !currentYear ||
      !membershipPeriod
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    if (receiptId.trim() === "") {
      setReceiptIdError("Receipt ID is required.");
      return;
    }
    const validate = userValidator.safeParse({ phoneNumber });
    if (!validate.success) {
      alert(validate.error.errors[0].message);
      return;
    }
    try {
      const res = await axios.post('https://yugmak24.el.r.appspot.com/api/v1/prime/primeCashPayment', {
        fullName: name,
        dateOfBirth: dob,
        gender,
        personalEmail: email,
        phoneNumber,
        sapId,
        collegeEmail: collegeEmail,
        course,
        department,
        degree,
        graduationStartYear: degreeStartYear,
        graduationEndYear: degreeEndYear,
        graduationCurrentYear: currentYear,
        membershipPeriod,
        coupon,
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      // console.log("Receipt ID Submitted:", receiptId);
      // setShowPopup(false);
      navigate("/success"); // Redirect to /success

      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Error paying cash. Please try again.");
    }
  }

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Gender</option>
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
              value={collegeEmail}
              onChange={(e) => setCollegeEmail(e.target.value)}
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
              placeholder="Your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone (WhatsApp)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={sapId}
              onChange={(e) => setSapId(e.target.value)}
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
              value={course}
              onChange={(e) => setCourse(e.target.value)}
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
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="degreeStartYear" className="block text-sm font-medium">
              Degree Start Year
            </label>
            <select
              id="degreeStartYear"
              name="degreeStartYear"
              value={degreeStartYear}
              onChange={(e) => setDegreeStartYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="degreeEndYear" className="block text-sm font-medium">
              Degree End Year
            </label>
            <select
              id="degreeEndYear"
              name="degreeEndYear"
              value={degreeEndYear}
              onChange={(e) => setDegreeEndYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Year</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="currentYear" className="block text-sm font-medium">
              Current Year
            </label>
            <select
              id="currentYear"
              name="currentYear"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="membershipPeriod" className="block text-sm font-medium">
              Membership Period
            </label>
            <select
              id="membershipPeriod"
              name="membershipPeriod"
              value={membershipPeriod}
              onChange={(e) => setMembershipPeriod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Period</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
            </select>
          </div>

          <div className="mb-4 w-2/3 px-2">
            <label htmlFor="coupon" className="block text-sm font-medium">
              Coupon Code
            </label>
            <input
              type="text"
              id="coupon"
              name="coupon"
              placeholder="Enter your coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-1/3 px-2 mb-2 mt-5">
            <input
              type="button"
              value="Apply"
              onClick={handleCouponApply}
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
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Enter Receipt ID</h3>
                <input
                  type="text"
                  id="receiptId"
                  value={receiptId}
                  required
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
                    onClick={handlePayCash}
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