import React from "react";
import { Alert } from "react-native";
import { firebase } from "./firebaseConfig";
import {
  addDataInFireStore,
  getDataFromFirestore,
} from "./firebaseQueryHelpers";

export const logInWithFirebase = async (
  phone,
  reCaptcha,
  setLoading,
  setPhone,
  setNumbSend,
  setKey
) => {
  setLoading(true);
  const numbAuthProvider = new firebase.auth.PhoneAuthProvider();
  numbAuthProvider
    .verifyPhoneNumber(phone, reCaptcha.current)
    .then((key) => {
      setKey(key);
      setPhone("");
      setNumbSend(true);
      setLoading(false);
    })
    .catch((e) => {
      console.log("Err", e);
      setLoading(false);
    });
};

export const verifyOTPWithFirebase = async (key, code, setAllUsers) => {
  const credentials = await firebase.auth.PhoneAuthProvider.credential(
    key,
    code
  );
  firebase
    .auth()
    .signInWithCredential(credentials)
    .then(async (e) => {
      Alert.alert("OTP Success");
      if (e.additionalUserInfo.isNewUser) {
        await addUser({ phone: e.user.phoneNumber });
        getUserData(setAllUsers);
      }
    })
    .catch((e) => console.log("Err", e));
};

export const getUserData = (setData) => {
  getDataFromFirestore("users", setData);
};

export const addUser = (data) => {
  addDataInFireStore("users", data);
};
