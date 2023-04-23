import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import BackgroundImg from "../../../assets/movixRegisterBg.jpg"
import "./style.scss"

function RegisterBanner() {
  return (
    <div className='RegisterBanner' >
          <div className="backgroundImgCont">
                    <Img className="backgroundImg" src={BackgroundImg} />
                </div>
                <div className='opacity-layer'></div>
<ContentWrapper>
<div className="titleRegisterationPg" >
                    <h1>
                        Unlimited movies, TV shows and more.
                    </h1>
                    <p>
                        Watch anytime. anywhere.
                    </p>
                </div>
</ContentWrapper>
    </div>
  )
}

export default RegisterBanner;