import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss"
import useFetch from '../../../hooks/UseFetch';
import { useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img"
function HeroBanner() {
  const [background, setBackground] = React.useState("");
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // rseult is our array of images 
    // backdrop_path is our image path
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }
  return (
    <div className='heroBanner' >
      {!loading && <div className='backdrop-img'>
        <Img src={background} />
      </div>}
      <div className='opacity-layer'>

      </div>

      <ContentWrapper>
        <div className='heroBannerContent' >
          <span className='title' >Welcome</span>
          <span className='subTitle' >Millions of movies, TV shows and people to discover. Explore now</span>
          <div className='searchInput' >
            <input type='text'
              placeholder='search for a movie or tv show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler} />
            <button>search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
export default HeroBanner;