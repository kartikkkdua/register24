// src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.6;
  }

  input, select, textarea {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 14px;
    margin-bottom: 15px;
    width: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    font-size: 16px;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 8px ${({ theme }) => theme.primary};
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.placeholder};
    }
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 14px 20px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: ${({ theme }) => theme.boxShadow};
    font-size: 18px;
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => theme.buttonHoverBackground};
      transform: translateY(-2px);
    }

    &:active {
      background-color: ${({ theme }) => theme.buttonActiveBackground};
      transform: translateY(0);
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.primary};
      outline-offset: 2px;
    }
  }

  h2 {
    color: ${({ theme }) => theme.primary};
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
  }

  h3 {
    color: ${({ theme }) => theme.primary};
    font-size: 22px;
    margin-bottom: 15px;
  }

  .error {
    color: #f44336; /* Red color for error messages */
    font-size: 14px;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 12px;
    }

    input, select, textarea {
      padding: 10px;
      font-size: 14px;
    }

    button {
      padding: 10px;
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
