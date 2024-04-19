import { useEffect, useState } from "react";
import { movieDummy } from "../utils/dataDummy";
import MovieContainer from "../component/MovieContainer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { MovieListState, getMovieNowPlaying, getMovieTrending } from "../redux/reducer/movieListSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../component/NavBar";
import { Navigate } from "react-router-dom";

export default function Homepage() {

    const [loading, setLoading] = useState(false)
    let scrollAmountNowPlaying = 0;
    let scrollAmountTrending = 0;

    const movieList = useAppSelector((state): MovieListState => state.movieListSlice)
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        // nowPlayingMoviesData()
        // topRatedMoviesData()
        dispatch(getMovieNowPlaying())
        dispatch(getMovieTrending());
        console.log(movieList);

    }, [])

    return (
        <>
            <NavBar />
            {movieList.loading === 'succeeded' && movieList.errorStatus === 401 && <Navigate to={'/'}/> }
            <div className="content-wrapper p-4 h-screen pl-32 bg-[#101414] overflow-x-hidden">

                <div className="movie-wrapper relative">
                    <h2 className="font-extrabold  text-xl text-white mt-2">Now Playing</h2>
                    <div id='nowPlaying' className="movie-container flex items-center gap-2 mt-[-60px] w-full overflow-x-auto  overflow-y-hidden  no-scrollbar h-[400px] group">
                        <button className="w-[50px] h-[240px] p-10 text-left bg-transparent scale-0 group-hover:scale-100 group-hover:bg-gradient-to-r group-hover:from-[#0a0c0c] text-white absolute left-0 font-extrabold transition ease-in-out delay-100" onClick={() => (document.getElementById('nowPlaying')!.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: scrollAmountNowPlaying -= 350
                        }))}> &lt; </button>
                        <button className="w-[50px] h-[240px] p-10 text-right text-white absolute right-0 scale-0 group-hover:scale-100 bg-transparent group-hover:bg-gradient-to-l group-hover:from-[#0a0c0c] font-extrabold transition ease-in-out delay-100 " onClick={() => (document.getElementById('nowPlaying')!.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: scrollAmountNowPlaying += 350
                        }))} > &gt; </button>
                        {movieList.loading === 'pending' ? <h2 className="text-white">loading</h2> : movieList.loading === 'succeeded' && <MovieContainer movieList={movieList.moviesNowPlaying} /> }
                    </div>
                </div>

                <div className="movie-wrapper relative">
                    <h2 className="font-extrabold  text-xl text-white mt-[-20px]">Now Playing</h2>
                    <div id='trending' className="movie-container flex items-center gap-2 mt-[-60px] w-full overflow-x-auto  overflow-y-hidden  no-scrollbar h-[400px] group">
                        <button className="w-[50px] h-[240px] p-10 text-left bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#0a0c0c] text-white absolute left-0 z-20 font-extrabold transition ease-in-out delay-150 scroll-smooth" onClick={() => (document.getElementById('trending')!.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: scrollAmountTrending -= 350
                        }))}> &lt; </button>
                        <button className="w-[50px] h-[240px] p-10 text-right text-white absolute right-0 z-50 bg-transparent group-hover:bg-gradient-to-l group-hover:from-[#0a0c0c] font-extrabold transition ease-in-out delay-150 " onClick={() => (document.getElementById('trending')!.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: scrollAmountTrending += 350
                        }))} > &gt; </button>
                        {movieList.loading === 'pending' ? <h2 className="text-white">loading</h2> : movieList.loading === 'succeeded' &&  <MovieContainer movieList={movieList.moviesTrending} />}
                    </div>
                </div>
            </div>
        </>
    )
}