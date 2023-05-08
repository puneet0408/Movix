import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import "./style.scss";

function Favourite({ id, Favouriteitem, setFavouriteitem }) {
    const [Favourite, setfavorite] = useState(false);
    const switchFun = (e) => {
        e.stopPropagation();
        setfavorite((prev) => !prev)
    }
    const AddToFav = (id) => {
        setFavouriteitem([...Favouriteitem, id])
    }
    const RemoveFromFav = (data) => {
        console.log(data);
        const updatedList = Favouriteitem.filter((elm) => {
            return data !== elm;
        })

        setFavouriteitem(updatedList)
    }

    return (
        <div onClick={switchFun} className='Favcontainer' >
            {
                Favourite ?
                    <div className='heartfill' onClick={() => RemoveFromFav(id)} ><AiFillHeart /></div>
                    :
                    <div className='heartBlank' onClick={() => AddToFav(id)} ><AiOutlineHeart /></div>
            }
        </div>
    )
}
export default Favourite;