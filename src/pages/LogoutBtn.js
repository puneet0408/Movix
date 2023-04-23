import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from "../firebase/Firebase"
import { Logout } from "../store/UserAuth"
function LogoutBtn() {
  const dispatch = useDispatch();

  const authSignOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      clear();
      dispatch(Logout())
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className='loginForm' >
      <button onClick={authSignOut} style={{
        background: "transparent",
        border: "none",
        width: "20rem",
        height: "100%",
        color: "#fff",
        fontSize: "20px",
        textAlign:"start"
      }} >Logout</button>
    </div>
  )
}
export default LogoutBtn;