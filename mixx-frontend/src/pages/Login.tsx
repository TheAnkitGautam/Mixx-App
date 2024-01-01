import "./Login.css";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { LoginMetadata } from "../Models/LoginMetadata";
import music from "./../Assets/music.png";
import symbol from "./../Assets/symbol.png";
import Register from "./Register";

interface LoginProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}

let email = "";
let password = "";

const Login: React.FC<LoginProps> = ({ loginfunction, loginMetadata }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const clientId =
    "413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com";
  useEffect(() => {
    document.title = "Login - Mixx";
    // const initClient = () => {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: "",
    //   });
    // };
    // gapi.load("client:auth2", initClient);
  });
  const onGoogleSuccess = (res: any) => {
    console.log("success:", res);
    let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
    newLoginMetadata.emailId = res.profileObj.email;
    loginfunction(newLoginMetadata);
  };
  const onGoogleFailure = (err: any) => {
    console.log("failed:", err);
  };

  return showRegister ? (
    <Register
      loginMetadata={loginMetadata}
      loginfunction={loginfunction}
      setShowRegister={setShowRegister}
    />
  ) : (
    <div className="login-container login">
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
            <div>LOG IN</div>
            <div className="line"></div>
          </div>
          <div className="form">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                axios
                  .post("http://localhost:5000/auth/login", {
                    email: email,
                    password: password,
                  })
                  .then((res: any) => {
                    alert("Login Successful");
                    console.log(res);
                    loginfunction(res.data);
                  })
                  .catch((err) => {
                    console.log(err.response.data.error);
                  });
              }}
            >
              <div className="inputBox">
                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    email = e.target.value;
                  }}
                  required
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
              <input type="submit" value="LOG IN" />
            </form>
          </div>
          {/* <div className="divider">
            <div className="left"></div>
            <div className="content">OR</div>
            <div className="right"></div>
          </div> */}
          {/* <div className="social-login ion-text-center">
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
              Dont have an account?{" "}
              <span
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                SIGN UP
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
