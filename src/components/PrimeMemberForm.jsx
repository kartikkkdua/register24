// src/components/PrimeMemberForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Styled Components
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

const Input = styled(Field)`
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

const Select = styled(Field)`
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

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

// PrimeMemberForm Component
const PrimeMemberForm = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const history = useHistory();

  const membershipPrices = {
    '1 Year': 500,
    '2 Years': 900,
    '3 Years': 1300,
    '4 Years': 1600,
  };

  useEffect(() => {
    const price = membershipPrices['1 Year'] || 0;
    setTotalAmount(price);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/register', { ...values, totalAmount, couponCode });
      const { transactionId, discountApplied } = response.data;

      history.push({
        pathname: '/success',
        state: { transactionId, totalAmount, discountApplied }
      });
    } catch (error) {
      console.error('There was an error registering the member!', error);
      alert('Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
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
        couponCode: '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
        primaryEmailId: Yup.string().email('Invalid email address').required('Primary Email ID is required'),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone Number is required'),
        sapId: Yup.string().required('SAP ID is required'),
        collegeEmailId: Yup.string().email('Invalid email address').required('College Email ID is required'),
        course: Yup.string().required('Course is required'),
        department: Yup.string().required('Department is required'),
        degree: Yup.string().required('Degree is required'),
        graduationStartYear: Yup.number().required('Graduation Start Year is required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
        graduationEndYear: Yup.number().required('Graduation End Year is required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
        graduationCurrentYear: Yup.number().required('Graduation Current Year is required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
        membershipPeriod: Yup.string().required('Membership Period is required'),
        agreeToCodeOfEthics: Yup.boolean().oneOf([true], 'You must agree to the Code of Ethics'),
        couponCode: Yup.string().matches(/^[A-Z0-9]{6}$/, 'Invalid coupon code').optional(),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
            />
            <ErrorMessage name="fullName" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
            />
            <ErrorMessage name="dateOfBirth" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select as="select" id="gender" name="gender">
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <ErrorMessage name="gender" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="primaryEmailId">Primary Email ID</Label>
            <Input
              type="email"
              id="primaryEmailId"
              name="primaryEmailId"
              placeholder="Enter your primary email ID"
            />
            <ErrorMessage name="primaryEmailId" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number (Whatsapp)</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
            />
            <ErrorMessage name="phoneNumber" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="sapId">SAP ID</Label>
            <Input
              type="text"
              id="sapId"
              name="sapId"
              placeholder="Enter your SAP ID"
            />
            <ErrorMessage name="sapId" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="collegeEmailId">College Email ID</Label>
            <Input
              type="email"
              id="collegeEmailId"
              name="collegeEmailId"
              placeholder="Enter your college email ID"
            />
            <ErrorMessage name="collegeEmailId" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="course">Course</Label>
            <Input
              type="text"
              id="course"
              name="course"
              placeholder="Enter your course"
            />
            <ErrorMessage name="course" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="department">Department</Label>
            <Input
              type="text"
              id="department"
              name="department"
              placeholder="Enter your department"
            />
            <ErrorMessage name="department" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="degree">Degree</Label>
            <Input
              type="text"
              id="degree"
              name="degree"
              placeholder="Enter your degree"
            />
            <ErrorMessage name="degree" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="graduationStartYear">Graduation Start Year</Label>
            <Input
              type="number"
              id="graduationStartYear"
              name="graduationStartYear"
              placeholder="Enter your graduation start year"
            />
            <ErrorMessage name="graduationStartYear" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="graduationEndYear">Graduation End Year</Label>
            <Input
              type="number"
              id="graduationEndYear"
              name="graduationEndYear"
              placeholder="Enter your graduation end year"
            />
            <ErrorMessage name="graduationEndYear" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="graduationCurrentYear">Graduation Current Year</Label>
            <Input
              type="number"
              id="graduationCurrentYear"
              name="graduationCurrentYear"
              placeholder="Enter your current year of graduation"
            />
            <ErrorMessage name="graduationCurrentYear" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="membershipPeriod">Membership Period</Label>
            <Select as="select" id="membershipPeriod" name="membershipPeriod">
              <option value="" disabled>Select Membership Period</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
            </Select>
            <ErrorMessage name="membershipPeriod" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Field type="checkbox" id="agreeToCodeOfEthics" name="agreeToCodeOfEthics" />
            <Label htmlFor="agreeToCodeOfEthics">I agree to the Code of Ethics</Label>
            <ErrorMessage name="agreeToCodeOfEthics" component={ErrorText} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="couponCode">Coupon Code</Label>
            <Input
              type="text"
              id="couponCode"
              name="couponCode"
              placeholder="Enter coupon code (if any)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <ErrorMessage name="couponCode" component={ErrorText} />
          </FormGroup>

          <TotalAmount>Total Amount: ₹{totalAmount - discount}</TotalAmount>
          <Button type="submit" disabled={isSubmitting}>Proceed to Payment</Button>
        </Form>
      )}
    </Formik>
  );
};

export default PrimeMemberForm;