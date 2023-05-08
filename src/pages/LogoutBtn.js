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
  
    });
  }
 
  return (
    <div className='loginForm' >
      <p onClick={authSignOut} style={{
        width:"100%",
        height:"100%",
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "20px",
        textAlign: "center"
      }} >Logout</p>
    </div>
  )
}
export default LogoutBtn;