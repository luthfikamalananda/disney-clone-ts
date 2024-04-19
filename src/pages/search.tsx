import { Link } from "react-router-dom";
import NavBar from "../component/NavBar";
import { movieDummy } from "../utils/dataDummy";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import instance from "../utils/axiosInstance";
import { useAppSelector } from "../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { MovieSearchedState, getSearchedMovies } from "../redux/reducer/movieSearchedSlice";
import { MovieListState, getMovieNowPlaying } from "../redux/reducer/movieListSlice";


export default function Search() {
    const [inputSearch, setInputSearch] = useState('')
    const [debouncedInput] = useDebounce(inputSearch, 1000);
    
    const searchedMovies:any = useAppSelector((state): MovieSearchedState => state.searchedMovies)
    const nowPlayingMovies = useAppSelector((state):MovieListState => state.movieListSlice)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (debouncedInput !== '') {
            dispatch(getSearchedMovies(debouncedInput))
            console.log(searchedMovies);
        } else if(debouncedInput == '') {
            dispatch(getMovieNowPlaying())
        }
        
    }, [debouncedInput])

    return (
        <>
            <NavBar />
            <div className="search-wrapper content-wrapper p-4 h-screen pl-32 bg-[#101414] overflow-x-hidden">
                <div className="input-wrapper mt-2 flex items-center w-full h-16 bg-[#252833] rounded-lg">
                    <div className="pl-4">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.1rem" viewBox="0 0 24 24"><path fill="#6b7280" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                        </span>
                    </div>

                    <input onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} type="text" className="w-full p-4 rounded-lg bg-transparent text-xl font-semibold outline-none text-white" autoComplete="off" placeholder="Movies, Shows and More" />
                </div>
                <div className="movie-wrapper">
                    {debouncedInput ? searchedMovies.loading === 'succeeded' &&
                    <>
                        <h2 className="font-extrabold  text-xl text-white mt-10 mb-3">Your Search : {debouncedInput}</h2>
                        <div id='nowPlaying' className="movie-container flex gap-x-2 gap-y-6 flex-wrap justify-start flex-none">
                            {searchedMovies.searchedMovies.results.map((movie:any) => (
                                <div key={movie.id} className={`movie-card`}>
                                    <Link to={`/homepage/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className={`h-60 hover:scale-150 duration-150 hover:relative`} alt="img" /></Link>
                                </div>
                            ))}
                        </div>
                    </> 
                    : <>
                    <h2 className="font-extrabold  text-xl text-white mt-10 mb-3">Now Playing</h2>
                    <div id='nowPlaying' className="movie-container flex gap-x-2 gap-y-6 flex-wrap justify-start">
                        {nowPlayingMovies.moviesNowPlaying.map((movie) => (
                            <div key={movie.id} className={`movie-card`}>
                                <Link to={`/homepage/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className={`h-60 hover:scale-150 duration-150 hover:relative`} alt="img" /></Link>
                            </div>
                        ))}
                    </div>
                    </>}
                    
                </div>
            </div>
        </>
    )
}