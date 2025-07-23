// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDVUEZ3ZVmH4ld7LVnEq_L368wEJpEs-l8",
  authDomain: "zeepaylater-93a94.firebaseapp.com",
  projectId: "zeepaylater-93a94",
  storageBucket: "zeepaylater-93a94.appspot.com",
  messagingSenderId: "358065954807",
  appId: "1:358065954807:web:66619211fea82a4b2518f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
