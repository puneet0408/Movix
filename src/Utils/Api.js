import axios from "axios";
const BASE_URl = "https://api.themoviedb.org/3";
const  TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzJlYTQ0ZDEzZDE3MDk3OWE0NTFiMWQzYjA5NjMzOSIsInN1YiI6IjY0MzNhYjk4MzkxYjljMDBiNmFlZjMzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fLv8icLvFuUA5iVl5DrmRZq3Fh6-8yRDNStVYgcWGnM"

const headers = {
    Authorization:"bearer " +TMDB_TOKEN,
 };
 export  const fetchDataFromApi = async (url , params) => {
        try {
            const {data} = await axios.get(BASE_URl + url,{
                headers,
                params
            })
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
 


    