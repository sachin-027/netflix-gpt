import { useRef, useState } from "react";
import Header from "./Header";
import { CheckValidData } from "../utils/Validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errMessage, seterrMessage] = useState(null);
  const navigate= useNavigate();
  const dispatch = useDispatch();


  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handelButtonclick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const fullNameValue = !isSignInForm ? fullName.current.value : null;

    

    // Step 1: Empty field checks
    if (!isSignInForm && !fullNameValue) {
      seterrMessage("⚠ Full Name is required");
      return;
    }

    if (!emailValue) {
      seterrMessage("⚠ Email is required");
      return;
    }

    if (!passwordValue) {
      seterrMessage("⚠ Password is required");
      return;
    }

    // Step 2: Regex validation
    const message = CheckValidData(emailValue, passwordValue);
    if (message) {
      seterrMessage( message);
      return;
    }


    if (!isSignInForm){
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    updateProfile(user, {
  displayName: fullName.current.value, photoURL: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
}).then(() => {
  // Profile updated!

  // ...
      const {uid,email,displayName,photoURL} = auth.currentUser;

    dispatch(addUser({uid: uid ,email:email, displayName: displayName,photoURL: photoURL}));
  
     navigate("/browse")

}).catch((error) => {
  // An error occurred
  // ...
  seterrMessage(error.message);
});
    console.log(user);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrMessage(errorCode + "-" + errorMessage)
    // ..
  });
    }
    else{
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
     navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrMessage(errorCode + "-" + errorMessage)
  });
    }
    

  
    seterrMessage(null);
  };

  const togglesignInForm = () => {
    setSignInForm(!isSignInForm);
    seterrMessage(null); // clear error when switching forms
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_small.jpg"
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-36 right-0 left-0 mx-auto text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />

        
        {errMessage && (
          <p className="text-red-500 font-semibold my-2">{errMessage}</p>
        )}

        <button
          className="p-2 my-6 bg-red-700 w-full rounded-md "
          onClick={handelButtonclick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={togglesignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
