import React, { useState, useMemo } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { getCurrentUser } from '../../firebase/FireStoreApi';
import EditProfile from './EditProfile';
import { HiOutlinePencil } from "react-icons/hi";
import { getCurrentUser } from '../../firebase/FireStoreApi';
import {UploadImage} from "./UploadImage"
import { UploadBgImg } from "./UploadBgImg"
import Img from "../../components/lazyLoadImage/Img"
import LogoutBtn from "../../pages/LogoutBtn";
import './style.scss'
import { AiFillFileAdd } from "react-icons/ai";

function Profile() {
    const [currentuser, setCurrentUser] = useState({});
    const [image, setImgs] = useState(null);
    const [backgroundImg, setBackgroundImg] = useState(null);
    const [isedit, setIsEdit] = useState(false)
    const onEdit = () => {
        setIsEdit(!isedit);
    }
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);

    const AddProfileimage = (e) => {
        if (e.target.files[0]) {
            setImgs(e.target.files[0]);
            UploadImage(e.target.files[0], currentuser?.id)
        }
    };


    const Addbgimage = (e) => {
        if (e.target.files[0]) {
            setBackgroundImg(e.target.files[0]);
            UploadBgImg(e.target.files[0], currentuser?.id)
        }
    };






    return (
        <div className='profileContainer' >
            <React.Fragment>
                {currentuser?.BackgroundImg ? <div className="backdrop-img">
                    <div className='addbgIcon' >
                        <label htmlFor='bginput' >{<HiOutlinePencil />}</label>
                        <input id='bginput' style={{ display: 'none' }} type='file' onChange={Addbgimage} />
                    </div>
                    <Img src={currentuser?.BackgroundImg} />

                </div> : <div className='bgImgContainer' >
                    <div className='addbgIcon' >
                        <label htmlFor='bginput' >{<AiFillFileAdd />}</label>
                        <input id='bginput' style={{ display: 'none' }} type='file' onChange={Addbgimage} />
                    </div>
                </div>}

                <div className="opacity-layer" ></div>
                <ContentWrapper>
                    <div className='content'>
                        <div className='left' >
                            {currentuser?.imageLink ? <div className='profilePic' >
                                <div className='addIcon' >
                                    <label htmlFor='input' >{<HiOutlinePencil />}</label>
                                    <input id='input' style={{ display: 'none' }} type='file' onChange={AddProfileimage} />
                                </div>
                                <img style={{ width: '100%' }} src={currentuser?.imageLink} />

                            </div> :
                                <div className='addImageContainer' >
                                    <div className='addIcon' >
                                        <label htmlFor='input' >{<AiFillFileAdd />}</label>
                                        <input id='input' style={{ display: 'none' }} type='file' onChange={AddProfileimage} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='right' >
                            {isedit ? <EditProfile onEdit={onEdit} /> :
                                <div className='Container' >
                                    <div className='basicDetailContainer' >
                                        {currentuser?.name &&
                                            <div className='name'>
                                                Name : <span className='about' > {currentuser?.name}</span>
                                            </div>}
                                        {currentuser?.email &&
                                            <div className='email'>
                                                Email : <span className='about'  > {currentuser?.email}</span>
                                            </div>}
                                        {
                                            currentuser?.Gender &&
                                            <div className='gender'>
                                                <span className='heading' >  Gender :  </span>   <span className='about'  > {currentuser?.Gender}</span>
                                            </div>}
                                        {currentuser?.age &&
                                            <div className='age'>
                                                Age :  <span className='about'  > {currentuser?.age}</span>
                                            </div>}
                                        {currentuser?.aboutMe &&
                                            <div className='aboutMe'>
                                                AboutMe :  <span className='about'  >{currentuser?.aboutMe}</span>
                                            </div>}
                                        <button className='logoutBtn' ><LogoutBtn /></button>
                                    </div>

                                    <div className='edit_btnCont' >
                                        <button className='edit_btn' onClick={onEdit} ><HiOutlinePencil /></button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </ContentWrapper>
            </React.Fragment>
        </div>
    )
}

export default Profile;