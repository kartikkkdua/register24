import React from "react";
import logo from "./logo (1).png"

const Register = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center max-w-2xl w-full mx-4">
      <img 
      src={logo}
      alt="logo"
      className="mb-4 h-16 w-auto mx-auto my-auto" // Adjust height and other styles as needed
      />
        <h2 className="text-2xl font-semibold mb-4">Prime Member Registration</h2>
        <form className="text-gray-700 flex flex-wrap justify-between">
          <div className="mb-4 w-full px-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
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
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone.."
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
              placeholder="Your SAP ID.."
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
              placeholder="Your course.."
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
              placeholder="Your degree.."
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

          <div className="mb-4 w-full px-2">
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
              placeholder="Your Coupon Code.."
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
        </form>

        
      </div>
    </div>
  );
};

export default Register;
