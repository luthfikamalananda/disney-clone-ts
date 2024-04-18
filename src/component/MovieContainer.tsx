import { Key } from "react";
import { Link } from "react-router-dom";

export default function MovieContainer({movieList}: {movieList:any}) {
  return (
    <>
      {movieList.map((movie: { id: Key | null | undefined; poster_path: any; }) => (
        <div key={movie.id} className={`movie-card h-full flex-none hover:scale-100`}>
          <Link to={`/homepage/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-60 hover:scale-150 duration-150" alt="img" /></Link>
        </div>
        
      ))}
    </>
  )
}