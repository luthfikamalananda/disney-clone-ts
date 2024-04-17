import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

export default function Homepage() {

    const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([])
    const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    // const credential = useAppSelector((state): CredentialState => state.user)
    const instance = useAxios();

    const nowPlayingMoviesData = async () => {
        try {
            setLoading(true)
            const movies = await instance.get('/movies/now-playing')
            setNowPlayingMovies(movies.data.data.results)
            console.log(movies.data.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const topRatedMoviesData = async () => {
        try {
            setLoading(true)
            const movies = await instance.get('/movies/top-rated')
            setTopRatedMovies(movies.data.data.results)
            console.log(movies.data.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        nowPlayingMoviesData()
        topRatedMoviesData()
    }, [])

    return (
        <>
            <div className="content-wrapper p-4 bg-[#101414] overflow-hidden">
                <h2 className="font-extrabold  text-xl text-white">Now Playing</h2>
                <div className="movie-container flex o gap-4 mt-4 w-full overflow-x-scroll scroll-auto">
                    {loading ? <h2>loading</h2> : nowPlayingMovies.map((movie) => (
                        <div key={movie.id} className={`movie-card w-72 h-full flex-none `}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-96" alt="img"  /></div>
                    )
                    ) }
                </div>
                <h2 className="font-extrabold  text-xl text-white mt-6">Trending</h2>
                <div className="movie-container flex o gap-4 mt-4 w-full overflow-x-scroll scroll-auto">
                    {loading ? <h2>loading</h2> : topRatedMovies.map((movie) => (
                        <div key={movie.id} className={`movie-card w-72 h-full flex-none `}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-96" alt="img"  /></div>
                    )
                    ) }
                </div>
            </div>
        </>
    )
}