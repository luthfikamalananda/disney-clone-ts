import { useEffect, useState } from "react";
import { movieDummy } from "../utils/dataDummy";
import MovieContainer from "../component/MovieContainer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { MovieListState, getMovieNowPlaying, getMovieTrending } from "../redux/reducer/movieListSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../component/NavBar";

export default function Homepage() {

    const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([])
    const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    // const credential = useAppSelector((state): CredentialState => state.user)

    const movieList = useAppSelector((state): MovieListState => state.movieListSlice)
    const dispatch = useDispatch<AppDispatch>();

    // const nowPlayingMoviesData = async () => {
    //     try {
    //         setLoading(true)
    //         const movies = await instance.get('/movies/now-playing')            
    //         setNowPlayingMovies(movies.data.data.results)
    //         console.log(movies.data.data.results);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const topRatedMoviesData = async () => {
    //     try {
    //         setLoading(true)
    //         const movies = await instance.get('/movies/top-rated')
    //         setTopRatedMovies(movies.data.data.results)
    //         console.log(movies.data.data.results);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false)
    //     }
    // }

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
                <h2 className="font-extrabold  text-xl text-white">Now Playing</h2>

                <div  className="movie-container flex o gap-2 mt-2 w-full overflow-x-scroll no-scrollbar">
                    {loading ? <h2>loading</h2> : <MovieContainer movieList={movieDummy} />}
                </div>

                <h2 className="font-extrabold  text-xl text-white mt-6">Trending</h2>
                <button className="w-96" onClick={() => document.getElementById('nowPlaying')!.scrollLeft += 20 }> Kanan </button>
                <div id='nowPlaying' className="movie-container flex o gap-2 mt-2 w-full overflow-x-auto  no-scrollbar">
                    {loading ? <h2>loading</h2> : <MovieContainer movieList={movieDummy} />}
                    
                </div>
            </div>
        </>
    )
}