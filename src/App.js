import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  ChakraProvider,
  CircularProgressLabel
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import "./styles.css";

const api = "https://kitsu.io/api/edge/";
export default function App() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState({});

  //console.log(info)
  useEffect(() => {
    if (text) {
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`).then(
        (response) =>
          response.json().then((response) => {
            setInfo(response);
          })
      );
    }
  }, [text]);
  return (
    <ChakraProvider>
      <div className="App">
        <h1>Animes</h1>
        <SearchInput value={text} onChange={(search) => setText(search)} />
        {text && !info.data && <span>Carregando...</span>}
        {info.data && (
          <ul className="animes-list">
            {info.data.map((anime) => (
              <li key={anime.id}>
                <img
                  src={anime.attributes.posterImage.small}
                  alt={anime.attributes.canonicalTitle}
                />
                <p>{anime.attributes.canonicalTitle}</p>
                <p>{anime.attributes.startDate}</p>
                <p>{anime.attributes.status}</p>
                <p>{anime.attributes.episodeCount}</p>
                <CircularProgress
                  value={anime.attributes.averageRating}
                  size="120px"
                >
                  <CircularProgressLabel>
                    {anime.attributes.averageRating}
                  </CircularProgressLabel>
                </CircularProgress>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ChakraProvider>
  );
}
