import React, { useState } from "react"
import Login from "./login/Login"
import RegisterForm from "./Register/Register"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import "./style.scss"
import RegisterBanner from "./RegisterBanner/RegisterBanner"
import { useSelector } from "react-redux";

export default function Registeration() {
  const [show, setShow] = useState(true);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div>
        <RegisterBanner />
        <ContentWrapper>
          <div className="auth">
            <div className="authcontainer" >
              <div className="authBody">
                <div className="authBodySwapButton">
                  <button
                    onClick={() => setShow(true)}
                    className={`${show ? "" : "activeSign"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className={`${show ? "activeSign" : ""}`}
                  >
                    Register
                  </button>
                </div>
                <div>
                  {show ? <Login /> : <RegisterForm />}
                </div>
              </div>
            </div>

          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}