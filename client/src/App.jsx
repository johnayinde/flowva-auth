import React from "react";
import AuthContainer from "./components/layout/AuthContainer";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/global.css";

// Your Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <div className="app">
          <AuthContainer />
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
