// src/components/PrimeMemberForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  animation: fadeIn 1s ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    max-width: 90%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 8px ${({ theme }) => theme.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 8px ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: ${({ theme }) => theme.boxShadow};

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${({ theme }) => theme.buttonActiveBackground};
    transform: translateY(0);
  }
`;

const MembershipPrices = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const PrimeMemberForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    primaryEmailId: '',
    phoneNumber: '',
    sapId: '',
    collegeEmailId: '',
    course: '',
    department: '',
    degree: '',
    graduationStartYear: '',
    graduationEndYear: '',
    graduationCurrentYear: '',
    membershipPeriod: '',
    agreeToCodeOfEthics: false,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const membershipPrices = {
    '1 Year': 500,
    '2 Years': 900,
    '3 Years': 1300,
    '4 Years': 1600,
  };

  useEffect(() => {
    const price = membershipPrices[formData.membershipPeriod] || 0;
    setTotalAmount(price);
  }, [formData.membershipPeriod]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { ...formData, totalAmount });
      alert('Registration successful!');
    } catch (error) {
      console.error('There was an error registering the member!', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h2>Prime Member Registration</h2>
      <MembershipPrices>
        <h3>Membership Prices</h3>
        <p>1 Year: ₹500</p>
        <p>2 Years: ₹900</p>
        <p>3 Years: ₹1300</p>
        <p>4 Years: ₹1600</p>
      </MembershipPrices>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="primaryEmailId">Primary Email ID</Label>
          <Input
            type="email"
            id="primaryEmailId"
            name="primaryEmailId"
            placeholder="Enter your primary email ID"
            value={formData.primaryEmailId}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number (Whatsapp)</Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="sapId">SAP ID</Label>
          <Input
            type="text"
            id="sapId"
            name="sapId"
            placeholder="Enter your SAP ID"
            value={formData.sapId}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="collegeEmailId">College Email ID</Label>
          <Input
            type="email"
            id="collegeEmailId"
            name="collegeEmailId"
            placeholder="Enter your college email ID"
            value={formData.collegeEmailId}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="course">Course</Label>
          <Input
            type="text"
            id="course"
            name="course"
            placeholder="Enter your course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="department">Department</Label>
          <Input
            type="text"
            id="department"
            name="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="degree">Degree</Label>
          <Input
            type="text"
            id="degree"
            name="degree"
            placeholder="Enter your degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="graduationStartYear">Graduation Start Year</Label>
          <Input
            type="number"
            id="graduationStartYear"
            name="graduationStartYear"
            placeholder="Enter your graduation start year"
            value={formData.graduationStartYear}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="graduationEndYear">Graduation End Year</Label>
          <Input
            type="number"
            id="graduationEndYear"
            name="graduationEndYear"
            placeholder="Enter your graduation end year"
            value={formData.graduationEndYear}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="graduationCurrentYear">Graduation Current Year</Label>
          <Input
            type="number"
            id="graduationCurrentYear"
            name="graduationCurrentYear"
            placeholder="Enter your current year"
            value={formData.graduationCurrentYear}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="membershipPeriod">Choose a Membership Period</Label>
          <Select
            id="membershipPeriod"
            name="membershipPeriod"
            value={formData.membershipPeriod}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Membership Period</option>
            <option value="1 Year">1 Year - ₹500</option>
            <option value="2 Years">2 Years - ₹900</option>
            <option value="3 Years">3 Years - ₹1300</option>
            <option value="4 Years">4 Years - ₹1600</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <Input
              type="checkbox"
              name="agreeToCodeOfEthics"
              checked={formData.agreeToCodeOfEthics}
              onChange={handleChange}
              required
            />
            Do You agree to CSI's Code of Ethics?
          </Label>
        </FormGroup>

        <TotalAmount>
          Total Amount: ₹{totalAmount}
        </TotalAmount>

        <Button type="submit">Register</Button>
      </form>
    </FormContainer>
  );
};

export default PrimeMemberForm;
