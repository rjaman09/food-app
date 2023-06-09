import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase.config";

import { LoginBg, Logo } from "../assets";
import LoginInput from "../components/LoginInput";

import { buttonClick } from "../animations";

import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { alertInfo, alertWarning } from "../context/actions/alertAction";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if ((userEmail === "" || password === "" || confirmPassword === "")) {
      dispatch(alertInfo("All Fields are Required !!"));
    } else {
      if (password === confirmPassword) {
        setUserEmail("");
        setConfirmPassword("");
        setPassword("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password Doesn't Match !!"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if ((userEmail !== "" && password !== "")) {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                dispatch(setUserDetails(data));
              });
              navigate("/", { replace: true });
            });
          }
        });
      })
    } else {
      dispatch(alertWarning("Password Doesn't Match !!"));
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">

      {/* <-- Background Img --> */}
      <img src={LoginBg} className="w-full h-full object-cover absolute top-0 left-0" alt="LoginImg" />

      {/* <-- Content Box --> */}
      <div className="flex flex-col items-center bg-darkOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">

        {/* <-- Logo section --> */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="Logo" />
          <p className="text-headingColor font-semibold text-2xl tracking-wide">City</p>
        </div>

        {/* <-- Welcome text --> */}
        <p className="text-3xl font-semibold text-headingColor"><span className="text-orange-500">Welcome</span> Back</p>
        <p className="text-lg text-textColor -mt-6">{isSignUp ? "Sign up" : "Sign in"} with following</p>

        {/* <-- Input section --> */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder={"Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}
          
          {!isSignUp ? (
            <p className="text-[14px] tracking-wide font-light">
              Doesn't have an account?&nbsp;
              <motion.button
                { ...buttonClick }
                className="text-orange-500 hover:underline cursor-pointer font-medium bg-transparent tracking-wide"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : ( 
            <p className="text-[14px] tracking-wide font-light">
              Already have an account?&nbsp;
              <motion.button 
                { ...buttonClick } 
                className="text-orange-500 hover:underline cursor-pointer font-medium bg-transparent tracking-wide"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </motion.button>
            </p>
          )}

          {/* <-- Button --> */}
          {isSignUp ? (
            <motion.button
              { ...buttonClick }
              className="w-full px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-sm text-white tracking-wide shadow-lg capitalize hover:brightness-125 hover:shadow-xl transition"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) :  (
            <motion.button
              { ...buttonClick }
              className="w-full px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-sm text-white tracking-wide shadow-lg capitalize hover:brightness-125 hover:shadow-xl transition"
              onClick={signInWithEmailPass}
            >
              Sign In
            </motion.button>
          )}
        </div>

        {/* <-- Border line --> */}
        <div className="flex items-center justify-between gap-16">
          <div className="w-28 h-[1px] rounded-md bg-white"></div>
          <p className="text-black text-[12px] tracking-widest font-light">OR</p>
          <div className="w-28 h-[1px] rounded-md bg-white"></div>
        </div>

        {/* <-- Google button --> */}
        <motion.div
          { ...buttonClick }
          className="flex items-center justify-center px-20 py-2 bg-gray-100 shadow-lg hover:brightness-105 hover:shadow-xl transition backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-2xl" />
          <p className="capitalize text-sm tracking-wide">Sign In with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;