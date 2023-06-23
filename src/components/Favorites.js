import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Contend from "./Contend";

const FavoritesCard = () => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({});
  const dataUser = {
    email: token.email,
    name: token.name,
  };
  useEffect(() => {
    axios.post("http://localhost:3001/api/favorites", dataUser).then((res) => {
      const { data } = res;
      console.log("estoy en data ", data);
      setFavorites(data);
    });
  }, []);
  console.log("Los favoritos son", favorites);
  return <div></div>;
};

export default FavoritesCard;
