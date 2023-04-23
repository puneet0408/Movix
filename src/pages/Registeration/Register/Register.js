import React, { useState } from 'react'
import { BsGoogle } from "react-icons/bs";
import { auth } from "../../../firebase/Firebase"
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
const provider = new GoogleAuthProvider();
import "../style.scss";

function Register() {
    const [Form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [localError, setLocalError] = useState({});
    console.log(localError);
    const [ErrorCode, setErrorCode] = useState();
    const { userName, email, password } = Form;
    const signUpHandler = async () => {
       
        if (!userName || !email || !password) return;
        try {
            const user = await createUserWithEmailAndPassword(auth,
                email,
                password);
            await updateProfile(auth.currentUser, {
                displayName: userName
            })
            console.log(user);
        } catch (error) {
            setErrorCode(error.code);
        }
    };
    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user);
        } catch (error) {
            setErrorCode(error.code);
        }
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
        setLocalError(validate(Form));
    }
    const validate = (values) => {
        const localError = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            localError.userName = "name is required";
        } else if (values.userName.length > 15) {
            localError.userName = "characters must be less then 15";
        } else if (!values.email) {
            localError.email = "email is required";
        } else if (!regex.test(values.email)) {
            localError.email = "this is not a valid format";
        } else if (!values.password) {
            localError.password = "password is required";
        } else if (values.password.length < 6) {
            localError.password = "password must be greater then 6";
        }
        return localError;
    }
    return (
        <div>
            <ContentWrapper>
                <div className='formpg'>
                    <div className='mainForm'>
                        <h1 className='mainheading' >Register</h1>
                        <div className="withgoogle" onClick={signInWithGoogle} >
                            <BsGoogle className='googleLogo' size={22} />
                            <span className="with_google_btn">
                                Sign in with Google
                            </span>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div class="form_group">
                                <input
                                    type="text"
                                    value={Form.userName}
                                    onChange={handleChange}
                                    class="my-form-control"
                                    placeholder="Enter Your name"
                                    name="userName"
                                    required
                                />
                            </div>
                            <div className='error'>{localError.userName}</div>
                            <div class="form_group">
                                <input
                                    type="email"
                                    value={Form.email}
                                    onChange={handleChange}
                                    class="my-form-control"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className='error' >{localError.email}</div>
                            <div class="form_group">
                                <input
                                    value={Form.password}
                                    type="password"
                                    onChange={handleChange}
                                    class="my-form-control"
                                    placeholder="Enter Your Password"
                                    name="password"
                                    required
                                />
                            </div>
                            <div className='error'>{localError.password}</div>
                            <div className='error'>{ErrorCode}</div>
                            <div class="button-wrapper">
                                <button type="submit" class="custom-button" onClick={signUpHandler} >
                                    Sign IN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}
export default Register;