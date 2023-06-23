import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import axios from "axios";

const MovieDetails = ({ movies, searchMovie }) => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  // Convertir el ID de la URL a un número
  const targetId = Number(id);
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  // Buscar la película por el ID
  let targetMovie = movies.find((movie) => movie.id === targetId);

  if (!targetMovie) {
    targetMovie = searchMovie.find((movie) => movie.id === targetId);
  }

  const dataFavorite = {
    email: token.email,
    name: targetMovie.title,
    URLimage: API_IMG + targetMovie.poster_path,
    description: targetMovie.overview,
  };

  const handleAddToFavorite = () => {
    axios.post(
      "http://localhost:3001/api/favorites/create-favorites",
      dataFavorite
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ paddingLeft: "250px" }}>{targetMovie.title}</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "70vh",
          alignItems: "center",
        }}
      >
        <img
          className="poster"
          style={{ paddingLeft: "15px" }}
          src={API_IMG + targetMovie.poster_path}
        />

        <p
          style={{
            textAlign: "center",
            fontSize: 30,
            paddingTop: "60",
            width: "50%",
          }}
        >
          {targetMovie.overview}
        </p>
      </div>
      {token.name && (
        <button
          style={{
            width: "99px",
            height: "30px",
            borderRadius: "20%",
            backgroundColor: "white",
          }}
          className="favoriteButtom"
          onClick={handleAddToFavorite}
        >
          Add to Favorite
        </button>
      )}
    </div>
  );
};

export default MovieDetails;
