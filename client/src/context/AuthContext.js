import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updatePassword as updatePasswordAPI,
  sendPasswordResetEmail,
  browserSessionPersistence,
  setPersistence,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { routes } from "../config/serverconfig";
//use production server api only when to deploy to firebase or in local server there is bug
const PROD_SERV_ADDRESS_API = routes.AUTH_SERV_ADDRESS_API;

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idToken, setIdToken] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //console.log("auth state changed");
      setUser(user);
      setLoading(false);
    });
  }, []);

  const signUp = async (email, password) => {
    try {
      const re = await setPersistence(auth, browserSessionPersistence);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const verifyemail = await sendEmailVerification(res.user);
        var removeunverified = await axios.post(
          `${PROD_SERV_ADDRESS_API}/auth/removeunverified`,
          {
            uid: res.user.uid,
          }
        );
      }
    } catch (error) {
      setError(error);
      return error;
    }
  };
  ///signup with email and password and user name
  const signUpWithName = async (email, password, username) => {
    try {
      const re = await setPersistence(auth, browserSessionPersistence);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      if (res.user) {
        const verifyemail = await sendEmailVerification(res.user);
        console.log("verifyemail", verifyemail);
        var removeunverified = await axios.post(
          `${PROD_SERV_ADDRESS_API}/auth/removeunverified`,
          {
            uid: res.user.uid,
          }
        );
        const updateDisplayName = await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
    } catch (error) {
      setError(error);
      return error;
    }
  };

  const signUpWithFirstLastNames = async (
    email,
    password,
    firstName,
    lastName
  ) => {
    try {
      const re = await setPersistence(auth, browserSessionPersistence);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      if (res.user) {
        const verifyemail = await sendEmailVerification(res.user);
        console.log("verifyemail", verifyemail);
        var removeunverified = await axios.post(
          `${PROD_SERV_ADDRESS_API}/auth/removeunverified`,
          {
            uid: res.user.uid,
          }
        );

        //add other info into users collection
        await db.collection("users").doc(res.user.uid).set({
          firstName: firstName,
          lastName: lastName,
        });

        const updateDisplayName = await updateProfile(auth.currentUser, {
          displayName: firstName,
        });
      }
    } catch (error) {
      setError(error);
      return error;
    }
  };

  /////

  const removeUser = async (uid) => {
    try {
      const res = await axios.post(
        `${PROD_SERV_ADDRESS_API}/auth/removeunverified`,
        {
          uid: uid,
        }
      );
      return res;
    } catch (error) {
      setError(error);
      return error;
    }
  };

  const signIn = async (email, password) => {
    const re = await setPersistence(auth, browserSessionPersistence);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const idtoken = await res.user.getIdToken(true);
        setIdToken(idtoken);
        return res;
      }
    } catch (error) {
      setError(error);
      return error;
    }
  };
  const verifyEmail = async () => {
    try {
      const res = await sendEmailVerification(currentUser);
      return res;
    } catch (error) {
      setError(error);
      return error;
    }
  };
  const logout = async () => {
    try {
      const res = await signOut(auth);
      return res;
    } catch (error) {
      setError(error);
      return error;
    }
  };
  const resetPassword = async (email) => {
    try {
      const res = await sendPasswordResetEmail(auth, email);
      return res;
    } catch (error) {
      setError(error);
    }
  };
  const updatePassword = async (password) => {
    try {
      const res = await updatePasswordAPI(currentUser, password);
      return res;
    } catch (error) {
      setError(error);
      return error;
    }
  };

  const value = {
    currentUser, // current user
    signIn, // sign in with email and password
    signUp, // sign up with email and password
    logout, // sign out
    verifyEmail, // send email verification
    resetPassword, // send password reset email
    updatePassword, // update password
    error, // error
    idToken, // id token
    removeUser, // remove user
    signUpWithName, // sign up with email and password and user name
    signUpWithFirstLastNames, // sign up with email, password, firstName, lastName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
