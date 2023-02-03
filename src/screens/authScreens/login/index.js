import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contextAPI";
import { firebaseConfig, firebase } from "../../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/compat/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  addUser,
  getUserData,
  logInWithFirebase,
  verifyOTPWithFirebase,
} from "../../../firebase/firebaseFunctions";
import { getDataFromFirestore } from "../../../firebase/firebaseQueryHelpers";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+923132029246");
  const [code, setCode] = useState("");
  const [numbSend, setNumbSend] = useState(false);
  const [key, setKey] = useState("");
  const reCaptcha = useRef(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUserData(setAllUsers);
  }, []);

  const changeNumber = (e) => {
    setPhone(e);
  };

  const changeCode = (e) => {
    setCode(e);
  };

  const logIn = async () => {
    logInWithFirebase(
      phone,
      reCaptcha,
      setLoading,
      setPhone,
      setNumbSend,
      setKey
    );
  };
  console.log(allUsers)

  const verifyPhone = async () => {
    verifyOTPWithFirebase(key, code, setAllUsers);
  };

  const addDocs = async () => {
    addUser({ name: "Mohtashim", age: "12" });
  };

  return (
    <View style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={reCaptcha}
        firebaseConfig={firebaseConfig}
      />
      <Text>Login</Text>
      {loading ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          {!numbSend ? (
            <ScrollView>
              <TextInput
                value={phone}
                style={{
                  width: 200,
                  borderWidth: 1,
                  padding: 10,
                  marginTop: 20,
                }}
                placeholder="Enter Youe number"
                onChangeText={changeNumber}
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={logIn}
                style={{
                  width: 200,
                  padding: 5,
                  backgroundColor: "black",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Log in</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <ScrollView>
              <TextInput
                value={code}
                style={{
                  width: 200,
                  borderWidth: 1,
                  padding: 10,
                  marginTop: 20,
                }}
                placeholder="Enter OTP"
                onChangeText={changeCode}
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={verifyPhone}
                style={{
                  width: 200,
                  padding: 5,
                  backgroundColor: "black",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Verify OTP</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      )}
      {allUsers?.map((v, i) => {
        return (
          <View>
            <Text>{v?.phone}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
