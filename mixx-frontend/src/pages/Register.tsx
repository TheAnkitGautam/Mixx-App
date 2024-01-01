import "./Register.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { LoginMetadata } from "../Models/LoginMetadata";
import music from "./../Assets/music.png";
import symbol from "./../Assets/symbol.png";

let name = "";
let email = "";
let password = "";

interface RegisterProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowRegister: (value: boolean) => void;
  loginMetadata: LoginMetadata;
}

const Register: React.FC<RegisterProps> = ({
  loginfunction,
  setShowRegister,
  loginMetadata,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const clientId =
    "413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com";
  useEffect(() => {
    document.title = "Mixx - Login";
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onGoogleSuccess = (res: any) => {
    let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
    newLoginMetadata.emailId = res.profileObj.email;
    loginfunction(newLoginMetadata);
  };
  const onGoogleFailure = (err: any) => {
    console.log("failed:", err);
  };

  return (
    <div className="register register-container">
      <div className="box">
        <div className="left-box">
          <div className="title">Welcome Note</div>
          <div className="title-underline"></div>
          <div className="content">
            Mixx is a web application that allows users to convert online videos
            to audio and add tags or comments to specific timestamps. Mixx
            supports a variety of audio and video formats, making it a
            convenient and versatile tool. To start using Mixx, simply launch
            the application, login and start coverting !!
          </div>
          <div className="image-box">
            <img src={symbol} alt="" className="music-symbol" />
            <img src={music} alt="" />
          </div>
        </div>
        <div className="right-box">
          <div className="title ion-text-center">
            <div>SIGN UP</div>
            <div className="line"></div>
          </div>
          <div className="form">
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                axios
                  .post("http://localhost:5000/auth/register", {
                    name: name,
                    email: email,
                    password: password,
                  })
                  .then((res) => {
                    setShowRegister(false);
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <div className="inputBox">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={(e) => {
                    name = e.target.value;
                  }}
                  placeholder=" "
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => {
                    email = e.target.value;
                  }}
                  placeholder=" "
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="inputBox">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => {
                    password = e.target.value;
                  }}
                  required
                  placeholder=" "
                />
                <label htmlFor="password">Password</label>
                <div className="eye-icon" onClick={handlePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              <input type="submit" value="SIGN UP" />
            </form>
          </div>
          {/* <div className="divider">
            <div className="left"></div>
            <div className="content">OR</div>
            <div className="right"></div>
          </div>
          <div className="social-login ion-text-center">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <div onClick={renderProps.onClick}>
                  <AiOutlineGoogle />
                </div>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div> */}
          <div className="footer">
            <div className="ion-text-center">
              Allready have an account?{" "}
              <span
                onClick={() => {
                  setShowRegister(false);
                }}
              >
                LOG IN
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
