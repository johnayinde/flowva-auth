import React, { useState } from "react";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import "./AuthContainer.css";

// Form types
const FORM_TYPES = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOT_PASSWORD: "forgot_password",
};

const AuthContainer = () => {
  const [activeForm, setActiveForm] = useState(FORM_TYPES.SIGN_IN);
  const [animating, setAnimating] = useState(false);

  const switchForm = (formType) => {
    setAnimating(true);

    setTimeout(() => {
      setActiveForm(formType);
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300); // This delay should match the exit animation duration
  };

  return (
    <div className="auth-container">
      <div className="auth-gradient-bar"></div>

      {activeForm === FORM_TYPES.SIGN_IN && (
        <SignInForm
          onSwitchToSignUp={() => switchForm(FORM_TYPES.SIGN_UP)}
          onSwitchToForgotPassword={() =>
            switchForm(FORM_TYPES.FORGOT_PASSWORD)
          }
          key="signin-form"
          animating={animating}
        />
      )}

      {activeForm === FORM_TYPES.SIGN_UP && (
        <SignUpForm
          onSwitchToSignIn={() => switchForm(FORM_TYPES.SIGN_IN)}
          key="signup-form"
          animating={animating}
        />
      )}

      {activeForm === FORM_TYPES.FORGOT_PASSWORD && (
        <ForgotPasswordForm
          onSwitchToSignIn={() => switchForm(FORM_TYPES.SIGN_IN)}
          key="forgot-form"
          animating={animating}
        />
      )}
    </div>
  );
};

export default AuthContainer;
export { FORM_TYPES };
