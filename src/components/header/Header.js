import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
window.scrollTo(0,0);
  },[location])

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
       }
    } else {
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])
  const searchQueryHandler = (e) => {
    if (e.key === "enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const onenSearch = () => {
    setShowSearch(true)
    setMobileMenu(false)
  }
  const openMobilemenu = () => {
    setShowSearch(false)
    setMobileMenu(true)
  }

  const navigatioHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" >
          <img src={logo} alt="" onClick={()=>{
            navigate('/')
          }} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigatioHandler("movie")}  >Movies</li>
          <li className="menuItem" onClick={() => navigatioHandler("tv")}   >TV Shows</li>
          <li className="menuItem" >
            <HiOutlineSearch onClick={onenSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={onenSearch} />
          {mobileMenu ?
            (<VscChromeClose onClick={() => setMobileMenu(false)} />)
            :
            (<SlMenu onClick={openMobilemenu} />)
          }
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className='searchInput' >
            <input type='text'
              placeholder='search for a movie or tv show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};
export default Header;