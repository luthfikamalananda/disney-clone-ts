import { Key } from "react";
import { Link } from "react-router-dom";

export default function MovieContainer({movieList}: {movieList:any}) {
  
  return (
    // const buttonRight = document.getElementById('slideRight');
    // const buttonLeft = document.getElementById('slideLeft');
    

    // buttonRight.onclick = function () {
    //   document.getElementById('container').scrollLeft += 20;
    // };
    // buttonLeft.onclick = function () {
    //   document.getElementById('container').scrollLeft -= 20;
    // };
    <>
      {movieList.map((movie: { id: Key | null | undefined; poster_path: any; }) => (
        <div key={movie.id} className={`movie-card h-full flex-none`}>
          <Link to={`/homepage/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-60 hover:scale-125 duration-150 " alt="img" /></Link>
        </div>
        
      ))}
    </>
  )
}