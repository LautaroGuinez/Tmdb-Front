import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import "./styles/App.css";

import Contend from "./components/Contend";
import MovieDetails from "./commons/MovieDetails";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { AuthContext } from "./context/authContext";
import Favorite from "./components/FavoritesCard";

function App() {
  const { token, login, logout } = useContext(AuthContext);

  const API_SEARCH =
    "https://api.themoviedb.org/3/search/movie?api_key=f3c93ba8179974c55a88be2a863678f5&query=";
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=f3c93ba8179974c55a88be2a863678f5";

  const [allmovies, setAllMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => res.data)
      .then((movies) => setAllMovies(movies.results));
    axios
      .get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        const { data } = res;

        login(data.user);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        logout();
        navigate("/login");
      });
  }, []);

  const handlerSearch = (e) => {
    e.preventDefault();
    axios
      .get(API_SEARCH + search)
      .then((res) => res.data)
      .then((movies) => setSearchMovie(movies.results));

    navigate(`/search/${search}`);
  };

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => logout());
  };

  return (
    <div className="app">
      <div className="searchNav">
        <div className="title">
          <Link to="/">
            <h1 style={{ color: "white" }}>Movies</h1>
          </Link>
        </div>

        <form style={{ backgroundColor: "white" }} onSubmit={handlerSearch}>
          <input
            style={{ backgroundColor: "white" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={{ color: "black", backgroundColor: "rgb(182, 149, 192)" }}
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="loginContainer">
          {token.name ? (
            <>
              <button className="userButtom">{token.name}</button>
              <button className="registerButton" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/favorites">
                <button className="favoritesButtom">Favorites</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="loginButton">
                  <span>Login</span>
                </button>
              </Link>
              <Link to="/register">
                <button className="registerButton">
                  <span>Register</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Contend movies={allmovies} />} />
        <Route
          path="/search/:query"
          element={<Contend movies={searchMovie} />}
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetails movies={allmovies} searchMovie={searchMovie} />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
