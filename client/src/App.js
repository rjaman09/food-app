import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";

import { Dashboard, Login, Main } from "./containers";
import { validateUserJWTToken } from "./api";
import { setUserDetails } from "./context/actions/userActions";
import { fadeInOut } from "./animations";
import { Alert, MainLoader } from "./components";

const App = () => {
  const firebaseAuth = getAuth(app);
  const alert = useSelector((state) => state.alert);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, [dispatch, firebaseAuth]);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">

      {isLoading && (
        <motion.div { ...fadeInOut } className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
          <MainLoader />
        </motion.div>
      )}

      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}

    </div>
  );
};

export default App;