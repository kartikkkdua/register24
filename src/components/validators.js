import * as Yup from 'yup';

export const primeMemberValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name cannot be more than 50 characters')
    .required('Full Name is required'),
  
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .nullable()
    .max(new Date(), 'Date of Birth cannot be in the future'),
  
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid Gender')
    .required('Gender is required'),
  
  primaryEmailId: Yup.string()
    .email('Invalid Email Address')
    .required('Primary Email ID is required'),
  
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits')
    .required('Phone Number is required'),
  
  sapId: Yup.string()
    .min(1, 'SAP ID must be at least 1 character')
    .max(20, 'SAP ID cannot be more than 20 characters')
    .required('SAP ID is required'),
  
  collegeEmailId: Yup.string()
    .email('Invalid College Email Address')
    .required('College Email ID is required'),
  
  course: Yup.string()
    .min(2, 'Course must be at least 2 characters')
    .max(50, 'Course cannot be more than 50 characters')
    .required('Course is required'),
  
  department: Yup.string()
    .min(2, 'Department must be at least 2 characters')
    .max(50, 'Department cannot be more than 50 characters')
    .required('Department is required'),
  
  degree: Yup.string()
    .min(2, 'Degree must be at least 2 characters')
    .max(50, 'Degree cannot be more than 50 characters')
    .required('Degree is required'),
  
  graduationStartYear: Yup.number()
    .min(1900, 'Graduation Start Year must be valid')
    .max(new Date().getFullYear(), 'Graduation Start Year cannot be in the future')
    .required('Graduation Start Year is required'),
  
  graduationEndYear: Yup.number()
    .min(Yup.ref('graduationStartYear'), 'Graduation End Year cannot be before the start year')
    .max(new Date().getFullYear(), 'Graduation End Year cannot be in the future')
    .required('Graduation End Year is required'),
  
  membershipPeriod: Yup.string()
    .oneOf(['1 Year', '2 Years', '3 Years', '4 Years'], 'Invalid Membership Period')
    .required('Membership Period is required'),
  
  agreeToCodeOfEthics: Yup.bool()
    .oneOf([true], 'You must agree to the Code of Ethics')
    .required('You must agree to the Code of Ethics'),
});