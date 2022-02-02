import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "justchill-1b97c.firebaseapp.com",
    projectId: "justchill-1b97c",
    storageBucket: "justchill-1b97c.appspot.com",
    messagingSenderId: "844944745877",
    appId: "1:844944745877:web:81e28a41fd852c6ac0029c",
    measurementId: "G-QTYDBZLWCB"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;