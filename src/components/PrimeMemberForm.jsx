import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import { primeMemberValidationSchema } from 'src/components/validators.js';

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
  color: ${({ theme }) => theme.error};
  font-size: 14px;
  margin-top: 5px;
`;

const PrimeMemberForm = () => {
  const membershipPrices = {
    '1 Year': 500,
    '2 Years': 900,
    '3 Years': 1300,
    '4 Years': 1600,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/register', values);
      console.log('Form submitted successfully:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Form submission error:', error);
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
        membershipPeriod: '',
        agreeToCodeOfEthics: false,
      }}
      validationSchema={primeMemberValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <FormContainer>
          <h2>Prime Member Registration</h2>
          <MembershipPrices>
            <h3>Membership Prices</h3>
            <p>1 Year: ₹500</p>
            <p>2 Years: ₹900</p>
            <p>3 Years: ₹1300</p>
            <p>4 Years: ₹1600</p>
          </MembershipPrices>

          <Form>
            <FormGroup>
              <Label htmlFor="fullName">Full Name</Label>
              <Input name="fullName" placeholder="Enter your full name" />
              <ErrorMessage name="fullName" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input name="dateOfBirth" type="date" />
              <ErrorMessage name="dateOfBirth" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" as="select">
                <option value="" label="Select Gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Other" label="Other" />
              </Select>
              <ErrorMessage name="gender" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="primaryEmailId">Primary Email ID</Label>
              <Input name="primaryEmailId" type="email" placeholder="Enter your primary email ID" />
              <ErrorMessage name="primaryEmailId" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">Phone Number (Whatsapp)</Label>
              <Input name="phoneNumber" placeholder="Enter your phone number" />
              <ErrorMessage name="phoneNumber" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="sapId">SAP ID</Label>
              <Input name="sapId" placeholder="Enter your SAP ID" />
              <ErrorMessage name="sapId" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="collegeEmailId">College Email ID</Label>
              <Input name="collegeEmailId" type="email" placeholder="Enter your college email ID" />
              <ErrorMessage name="collegeEmailId" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="course">Course</Label>
              <Input name="course" placeholder="Enter your course" />
              <ErrorMessage name="course" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="department">Department</Label>
              <Input name="department" placeholder="Enter your department" />
              <ErrorMessage name="department" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="degree">Degree</Label>
              <Input name="degree" placeholder="Enter your degree" />
              <ErrorMessage name="degree" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="graduationStartYear">Graduation Start Year</Label>
              <Input name="graduationStartYear" type="number" placeholder="Enter your graduation start year" />
              <ErrorMessage name="graduationStartYear" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="graduationEndYear">Graduation End Year</Label>
              <Input name="graduationEndYear" type="number" placeholder="Enter your graduation end year" />
              <ErrorMessage name="graduationEndYear" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="membershipPeriod">Membership Period</Label>
              <Select name="membershipPeriod" as="select">
                <option value="" label="Select Membership Period" />
                <option value="1 Year" label="1 Year" />
                <option value="2 Years" label="2 Years" />
                <option value="3 Years" label="3 Years" />
                <option value="4 Years" label="4 Years" />
              </Select>
              <ErrorMessage name="membershipPeriod" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="agreeToCodeOfEthics">
                <Field type="checkbox" name="agreeToCodeOfEthics" />
                I agree to the Code of Ethics
              </Label>
              <ErrorMessage name="agreeToCodeOfEthics" component={ErrorText} />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default PrimeMemberForm;