import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = ({ movies , searchMovie }) => {
  const { id } = useParams();

  // Convertir el ID de la URL a un número
  const targetId = Number(id);

  // Buscar la película por el ID
  let targetMovie = movies.find((movie) => movie.id === targetId);

  if (!targetMovie) {
    targetMovie = searchMovie.find((movie) => movie.id === targetId);
  }

  return (
    <div>
      <h1>{targetMovie.title}</h1>
      {/* Mostrar otros detalles de la película */}
    </div>
  );
};

export default MovieDetails;
