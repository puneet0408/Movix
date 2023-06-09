import React, { useEffect } from "react";
import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./Utils/Api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Detail";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { User, Logout } from "./store/UserAuth";
import { auth } from "./firebase/Firebase";
import { onAuthStateChanged } from 'firebase/auth';
import Registeration from "./pages/Registeration/registeration";
import Profile from "./pages/profilePage/Profile";


export default function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    console.log(user);


    // onAuthStateChanged recive data of user from firebase if user is login
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                localStorage.setItem('user', userAuth.uid)
                localStorage.setItem('email', userAuth.email)
                // user is logged in, send the user's details to redux, store the current user in the state
                dispatch(
                    User({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                    })
                );
            } else {
                dispatch(Logout());
            }
        });
    }, []);
    useEffect(() => {
        fetchApiconfig();
        genresCall();
    }, [])
    const fetchApiconfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "w1280",
                poster: res.images.secure_base_url + "w780",
                profile: res.images.secure_base_url + "h632",
            }
            dispatch(getApiConfiguration(url));
        })
    }
    const genresCall = async () => {
        let promise = []
        let endPoints = ['tv', "movie"];
        let allGenres = {}
        endPoints.forEach((url) => {
            promise.push(fetchDataFromApi(`/genre/${url}/list`))
        });
        const data = await Promise.all(promise);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item))
        })
        dispatch(getGenres(allGenres));
    }
    return (
        <BrowserRouter>
            <Header />
            {user === null ?
                <Registeration />
                :
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            }
            <Footer />
        </BrowserRouter>
    )
}