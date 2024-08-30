import React from "react";
import { useLocation } from 'react-router-dom';
import logo from "../logo (1).png";

const PaymentSuccessCard = () => {
  const location = useLocation();
  
  const { transactionId, totalAmount ,teamName} = location.state || {}; // Destructure the transaction details

  return (
    <div className="rt" style={{ backgroundColor: "rgb(245, 245, 245)", minHeight: "50vh" }}>
      <div className="cont5">
        <header className="Payment-header">
        <img src={logo} alt="Logo" className="logo1 w-20 mx-auto pt-8" />
        </header>
      </div>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
              style={styles.icon}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h2 style={styles.title}>Payment Successful</h2>
          <p style={styles.message}>
            {`Thank you for you payment. Team ${teamName} successfully registered for the prime membership.`}
          </p>
          <div style={styles.detailsContainer}>
            <p style={styles.detail}>
              <span style={styles.detailLabel}>Transaction Id:</span> {transactionId}
            </p>
            <p style={styles.detail}>
              <span style={styles.detailLabel}>Amount Paid:</span> Rs {totalAmount}
            </p>
            {/* <p style={styles.detail}>
              <span style={styles.detailLabel}>Payment Method:</span> 
            </p> */}
          </div>
          {/* <button style={styles.button}>View Order History</button> */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    height: "110vh",
    paddingBottom: "20vh", // Add bottom margin for spacing
  },
  
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  icon: {
    color: "#10B981",
    height: "64px",
    width: "64px",
  },
  title: {
    fontSize: "24px",
    color: "#1a1a1a",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#777777",
    marginBottom: "20px",
  },
  detailsContainer: {
    textAlign: "left",
    marginBottom: "20px",
  },
  detail: {
    fontSize: "16px",
    margin: "5px 0",
  },
  detailLabel: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF5722",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    paddingInline: "3vh",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
  },
  
  logo1: {
    
    height: "10px",
    width: "auto",
  },
};

export default PaymentSuccessCard;