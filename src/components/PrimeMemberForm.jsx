import React, { useState } from 'react';

const PrimeMemberForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    primaryEmail: '',
    phoneNumber: '',
    sapId: '',
    collegeEmail: '',
    course: '',
    department: '',
    degree: '',
    startYear: '',
    endYear: '',
    currentYear: '',
    membershipPeriod: '',
    agreeToCode: false,
  });

  const [membershipPrices, setMembershipPrices] = useState({
    oneYear: 100,
    twoYear: 180,
    threeYear: 250,
    fourYear: 300,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const totalAmount =
    formData.membershipPeriod === '1'
      ? membershipPrices.oneYear
      : formData.membershipPeriod === '2'
      ? membershipPrices.twoYear
      : formData.membershipPeriod === '3'
      ? membershipPrices.threeYear
      : membershipPrices.fourYear;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Prime Membership Registration</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        required
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="email"
        name="primaryEmail"
        placeholder="Primary Email ID"
        value={formData.primaryEmail}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone number (WhatsApp)"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="sapId"
        placeholder="SAP ID"
        value={formData.sapId}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="collegeEmail"
        placeholder="College Email ID"
        value={formData.collegeEmail}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="degree"
        placeholder="Degree"
        value={formData.degree}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="startYear"
        placeholder="Graduation/Post-Graduation Starting Year"
        value={formData.startYear}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="endYear"
        placeholder="Graduation/Post-Graduation Ending Year"
        value={formData.endYear}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="currentYear"
        placeholder="Graduation/Post-Graduation Current Year"
        value={formData.currentYear}
        onChange={handleInputChange}
        required
      />
      <select
        name="membershipPeriod"
        value={formData.membershipPeriod}
        onChange={handleInputChange}
        required
      >
        <option value="">Choose a Membership period</option>
        <option value="1">1 Year - ${membershipPrices.oneYear}</option>
        <option value="2">2 Years - ${membershipPrices.twoYear}</option>
        <option value="3">3 Years - ${membershipPrices.threeYear}</option>
        <option value="4">4 Years - ${membershipPrices.fourYear}</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="agreeToCode"
          checked={formData.agreeToCode}
          onChange={handleInputChange}
          required
        />
        Do You agree to CSI's Code of Ethics?
      </label>

      <h3>Total Amount: ${totalAmount}</h3>

      <button type="submit">Register</button>
    </form>
  );
};

export default PrimeMemberForm;
