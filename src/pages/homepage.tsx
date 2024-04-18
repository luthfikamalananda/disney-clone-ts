import { useEffect, useState } from "react";
import { movieDummy } from "../utils/dataDummy";
import MovieContainer from "../component/MovieContainer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { MovieListState, getMovieNowPlaying, getMovieTrending } from "../redux/reducer/movieListSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../component/NavBar";

export default function Homepage() {

    const [loading, setLoading] = useState(false)
    let scrollAmountNowPlaying = 0;
    let scrollAmountTrending = 0;

    const movieList = useAppSelector((state): MovieListState => state.movieListSlice)
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        // nowPlayingMoviesData()
        // topRatedMoviesData()
        // dispatch(getMovieNowPlaying())
        // dispatch(getMovieTrending());
        console.log(movieList);

    }, [])

    return (
        <>
            <NavBar />

            <div className="content-wrapper p-4 h-dvh pl-32 bg-[#101414] overflow-hidden">
                <h2 className="font-extrabold  text-xl text-white mt-6">Now Playing</h2>
                <div id='nowPlaying' className="movie-container flex items-center gap-2 mt-[-60px] w-full overflow-x-auto  overflow-y-hidden  no-scrollbar h-[400px] relative group">
                    <button className="w-[50px] h-[240px] p-10 text-left bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#0a0c0c] text-white fixed left-32 z-20 font-extrabold transition ease-in-out delay-150 scroll-smooth" onClick={() => (document.getElementById('nowPlaying')!.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: scrollAmountNowPlaying -= 350
                    }))}> &lt; </button>
                    <button className="w-[50px] h-[240px] p-10 text-right text-white fixed right-3 z-50 bg-transparent group-hover:bg-gradient-to-l group-hover:from-[#0a0c0c] font-extrabold transition ease-in-out delay-150 " onClick={() => (document.getElementById('nowPlaying')!.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: scrollAmountNowPlaying += 350
                    }))} > &gt; </button>
                    {loading ? <h2>loading</h2> : <MovieContainer movieList={movieDummy} />}
                </div>

                <h2 className="font-extrabold  text-xl text-white mt-6">Trending</h2>
                <div id='trending' className="movie-container flex items-center gap-2 mt-[-60px] w-full overflow-x-auto  overflow-y-hidden  no-scrollbar h-[400px] relative group">
                    <button className="w-[50px] h-[240px] p-10 text-left bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#0a0c0c] text-white fixed left-32 z-20 font-extrabold transition ease-in-out delay-150 scroll-smooth" onClick={() => (document.getElementById('trending')!.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: scrollAmountTrending -= 350
                    }))}> &lt; </button>
                    <button className="w-[50px] h-[240px] p-10 text-right text-white fixed right-3 z-50 bg-transparent group-hover:bg-gradient-to-l group-hover:from-[#0a0c0c] font-extrabold transition ease-in-out delay-150 " onClick={() => (document.getElementById('trending')!.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: scrollAmountTrending += 350
                    }))} > &gt; </button>
                    {loading ? <h2>loading</h2> : <MovieContainer movieList={movieDummy} />}
                </div>
            </div>
        </>
    )
}