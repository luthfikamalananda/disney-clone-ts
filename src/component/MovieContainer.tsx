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
      {movieList.map((movie: { id: Key | null | undefined; poster_path: any; }, index:number) => (
        <div key={movie.id} className={`movie-card flex-none`}>
          <Link to={`/homepage/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className={`h-60 hover:scale-150 duration-150 hover:z-50 ${index === 0 ? 'hover:translate-x-[50px]' : index === movieList.length - 1 && 'hover:translate-x-[-50px]'}`}  alt="img" /></Link>
        </div>
        
      ))}
    </>
  )
}