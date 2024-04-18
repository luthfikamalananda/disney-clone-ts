import { useEffect, useState } from "react";
import { movieDummySingle } from "../utils/dataDummy";
import MovieContainer from "../component/MovieContainer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../component/NavBar";
import { MovieDetailState, getDetailMovie } from "../redux/reducer/movieDetailSlice";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function DetailMovie() {

    const movieDetail = useAppSelector((state): MovieDetailState => state.movieDetailSlice)
    const dispatch = useDispatch<AppDispatch>();


    const urlParam = useParams()

    useEffect(() => {
        dispatch(getDetailMovie(`${urlParam.movieId}`));
    }, [])


    return (
        <>
            <NavBar />

            <div className="movieDetails-container" >
                {movieDetail.loading === 'pending' ? <div className="flex justify-center items-center h-screen bg-[#101414]"><ClipLoader
                    size={150}
                    color="rgba(227, 239, 236, 1)"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /></div> : movieDetail.loading === 'succeeded' ?
                    <div className="content-wrapper h-dvh bg-[#101414]">
                        <div className={`movie-poster h-full w-auto bg-cover bg-no-repeat bg-center bg-fixed`} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetail.movieDetail.backdrop_path}')` }}>
                            <div className="movie-description pl-24 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                                <div className="title">
                                    <h2 className="font-bold text-white shadow-black text-9xl pt-32 pl-10">{movieDetail.movieDetail.title}</h2>
                                </div>
                                <div className="tagline">
                                    <h2 className="font-bold text-white shadow-black text-2xl pt-4 pl-10">{movieDetail.movieDetail.tagline}</h2>
                                </div>
                                <div className="genre flex gap-2 pl-10 pt-2">
                                    {movieDetail.movieDetail.genres.map((genre :any) => <h2 className="font-bold text-white text-md">{genre.name}</h2>)}
                                </div>
                                <div className="rating flex items-center pl-8 pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="0 0 128 128"><path fill="#fdd835" d="m68.05 7.23l13.46 30.7a7.047 7.047 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.033 7.033 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.047 7.047 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01"/><path fill="#ffff8d" d="m67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13"/><path fill="#f4b400" d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97"/></svg>
                                    <h2 className="text-white font-bold">{movieDetail.movieDetail.vote_average}</h2>
                                </div>
                            </div>
                            <div className="overview flex items-center ml-24 pt-2">
                                    <h2 className="text-white font-bold pl-10">{movieDetail.movieDetail.overview}</h2>
                                </div>

                        </div>

                    </div>
                    : movieDetail.loading === 'failed' && <div className="flex justify-center items-center h-screen"><h2>Error {movieDetail.error}, Movie not Found</h2></div>}
            </div>

        </>
    )
}