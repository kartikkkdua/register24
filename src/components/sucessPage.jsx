import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const logoSrc = 'src/logo.png'; 

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Logo = styled.img`
  width: 150px; // Adjust the size as needed
  margin-bottom: 20px;
`;

const SuccessMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 1.2rem;
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessPage = () => {
  const location = useLocation();
  const { transactionId, totalAmount} = location.state || {};

  return (
    <SuccessContainer>
      <Logo src={logoSrc} alt="Logo" />
      <SuccessMessage>Registration Successful!</SuccessMessage>
      <p>Your registration was successful. Thank you for joining us!</p>
      {transactionId && (
        <p>Transaction ID: <strong>{transactionId}</strong></p>
      )}
      {totalAmount !== undefined && (
        <p>Total Amount: <strong>₹{totalAmount}</strong></p>
      )}

    </SuccessContainer>
  );
};

export default SuccessPage;