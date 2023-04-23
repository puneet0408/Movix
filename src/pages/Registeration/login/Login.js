import React, { useState } from 'react'
import { BsGoogle } from "react-icons/bs";
import "../style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { auth } from '../../../firebase/Firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
function Login() {
    const [FormData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = FormData;
    const [localError, setLocalError] = useState({});
    const [ErrorCode, setErrorCode] = useState();
    const validate = (values) => {
        const localError = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            localError.email = "email is required";
        } else if (!regex.test(values.email)) {
            localError.email = "this is not a valid format";
        } else if (!values.password) {
            localError.password = "password is required";
        } else if (password.length > 6) {
            localError.password = "password must be greater then 6";
        }
        return localError;
    }
    const loginHandler = async () => {
        if (!email || !password) return;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErrorCode(error.code);
        }
    }
    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, provider)
        } catch (error) {
            setErrorCode(error.code);
        }
    }
    let handleChange = (event) => {
        let { name, value } = event.target;
        setFormData({ ...FormData, [name]: value });
        setLocalError(validate(FormData))
    };
    return (
        <div>
            <ContentWrapper>
                <div className='formpg'>
                    <div className='mainForm'>
                        <h1 className='mainheading'>login</h1>
                        <div className="withgoogle" onClick={signInWithGoogle} >
                            <span className="with_google_btn">
                                login with Google
                            </span>
                            <BsGoogle className='googleLogo' size={22} />
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form_group">
                                <input
                                    type="email"
                                    value={FormData.email}
                                    onChange={handleChange}
                                    className="my-form-control"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className='error' >{localError.email}</div>
                            <div className="form_group">
                                <input
                                    value={FormData.password}
                                    type="password"
                                    onChange={handleChange}
                                    className="my-form-control"
                                    placeholder="Enter Your Password"
                                    name="password"
                                    required
                                />
                            </div>
                            <div className='error'  >{localError.password}</div>
                            <div>{ErrorCode}</div>
                            <div className="button-wrapper" onClick={loginHandler} >
                                <button type="submit" className="custom-button">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}
export default Login;