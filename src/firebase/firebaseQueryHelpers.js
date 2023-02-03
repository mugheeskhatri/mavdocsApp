import { firebase } from "./firebaseConfig";

export const getDataFromFirestore = async (collectionName, setData) => {
  const storeRef = firebase.firestore().collection(collectionName);
  await storeRef.onSnapshot((querySnapShot) => {
    const data = [];
    querySnapShot.forEach((e) => data.push({ ...e.data(), id: e.id }));
    setData(data);
  });
};

export const addDataInFireStore = async (collectionName, data) => {
  const storeRef = firebase.firestore().collection(collectionName);
  try {
    storeRef
      .add(data)
      .then((res) => console.log("Res", res))
      .catch((e) => console.log("Err", e));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
