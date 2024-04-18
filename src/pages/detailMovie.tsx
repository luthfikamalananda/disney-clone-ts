import { useEffect, useState } from "react";
import { movieDummy } from "../utils/dataDummy";
import MovieContainer from "../component/MovieContainer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { useAppSelector } from "../hooks/useAppSelector";
import NavBar from "../component/NavBar";
import { MovieDetailState, getDetailMovie } from "../redux/reducer/movieDetailSlice";
import { useParams } from "react-router-dom";

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
            <div className="movieDetails-container ml-24" >
                {movieDetail.loading === 'pending' ? <div className="flex justify-center items-center h-screen"><h2>Loading Movie Detail</h2></div> : movieDetail.loading === 'succeeded' ?
                    <div className="content-wrapper ml-24 p-4 h-dvh bg-[#101414] overflow-hidden">
                        <h2 className="text-white">{movieDetail.movieDetail.title}</h2>
                        <h2 className="text-white">{movieDetail.movieDetail.tagline}</h2>
                        <h2 className="text-white">{movieDetail.movieDetail.genre}</h2>
                        <h2 className="text-white">{movieDetail.movieDetail.vote_average}</h2>
                        <h2 className="text-white">{movieDetail.movieDetail.vote_count}</h2>
                    </div>
                    : movieDetail.loading === 'failed' && <div className="flex justify-center items-center h-screen"><h2>Error {movieDetail.error}, Movie not Found</h2></div>}
            </div>

        </>
    )
}