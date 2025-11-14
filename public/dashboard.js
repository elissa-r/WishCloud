//Script to make the logout button work on the dashboard page
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3661DPM0WZyzIsr2mqNMTcB2TUgMeO_M",
  authDomain: "wishcloud-bf5fe.firebaseapp.com",
  projectId: "wishcloud-bf5fe",
  storageBucket: "wishcloud-bf5fe.appspot.com",
  messagingSenderId: "499215872773",
  appId: "1:499215872773:web:5a1e77580be9edef817d6c",
  measurementId: "G-YXWE7LJJ0C"
};

//get firebase auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn"); //get logout button

  //check if user is logged in, if not logged in, go to login page
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });

  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth); //log out user
      window.location.href = "index.html"; //redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  });
});
