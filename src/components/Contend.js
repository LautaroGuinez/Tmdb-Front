import React from "react";
import MovieCard from "../commons/MovieCard";
import { Link } from "react-router-dom";



const Contend =({movies})=>{
  
    return(<div className='movies'>
    {movies.map((movie) => 
    <Link to={`/movie/${movie.id}`} > < MovieCard key = {movie.id}{...movie}/>
    </Link>
  
    )
    }
    </div>
)
    }


export default Contend 