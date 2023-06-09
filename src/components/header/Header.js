import React, { useEffect, useState , useMemo} from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import Avtar from "../../assets/avatar.png";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./Style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { useSelector } from "react-redux";
import { getCurrentUser } from '../../firebase/FireStoreApi';

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const [currentuser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };
    const openProfilePage = () => {
        navigate('/profile')
    }

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
        setProfileMenu(false)
    };
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
        setProfileMenu(false)
    };
    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                {user === null ? "" :
                    <ul className="menuItems">
                        <li className="menuItem"
                            onClick={() => navigationHandler("movie")}
                        >
                            Movies
                        </li>
                        <li className="menuItem"
                            onClick={() => navigationHandler("tv")}
                        >
                            TV Shows
                        </li>
                        <li className="menuItem">
                            <HiOutlineSearch onClick={openSearch} />
                        </li>
                        <li className="menuItem ProfilePicHeader" >
                        {currentuser?.imageLink ?
                                <img src={currentuser?.imageLink} alt="profileImg" onClick={openProfilePage} />
                                :
                                <img src={Avtar} alt="profileImg" onClick={openProfilePage} />}
                        </li>
                    </ul>
                }
                {user === null ? "" :
                    <div className="mobileMenuItems">
                        <HiOutlineSearch onClick={openSearch} />
                        <div className=" ProfilePicHeader" >
                            {currentuser?.imageLink ?
                                <img src={currentuser?.imageLink} alt="profileImg" onClick={openProfilePage} />
                                :
                                <img src={Avtar} alt="profileImg" onClick={openProfilePage} />}

                        </div>
                        {mobileMenu ? (
                            <VscChromeClose onClick={() => setMobileMenu(false)} />
                        ) : (
                            <SlMenu onClick={openMobileMenu} />
                        )}
                    </div>
                }
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};
export default Header;