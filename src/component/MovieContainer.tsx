import { Key } from "react";

export default function MovieContainer({movieList}: {movieList:any}) {
  return (
    <>
      {movieList.map((movie: { id: Key | null | undefined; poster_path: any; }) => (
        <div key={movie.id} className={`movie-card h-full flex-none `}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-60" alt="img" />
        </div>
      ))}
    </>
  )
}