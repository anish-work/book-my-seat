import React from "react";
import reactLogo from "../assets/react-brands.svg";
import firebaseLogo from "../assets/firebase_logo.png";
function Footer() {
  return (
    <div className="text-center mt-5">
      <h5>
        <img src={firebaseLogo} alt="firbaselogo" width="120px" />{" "}
        <img src={reactLogo} alt="reactlogo" width="50px" color="blue" />
      </h5>
    </div>
  );
}

export default Footer;
