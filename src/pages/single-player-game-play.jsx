import { alphabetArray } from "../data/const.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import PlayerAvatar from "/src/components/PlayerAvatar";

const SinglePlayerGamePlay = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const playerName = params.get("name");

  return (
    <>
      <h1>Single Player - Game play</h1>
      <PlayerAvatar />
      <p>Player Name: {playerName}</p>
      <GuessWordComponent />
    </>
  );
};

const GuessWordComponent = () => {
  const [selectedLetter, setSelectedLetter] = useState([]);
  const [movesCount, setMovesCount] = useState(0);

  const [movieTitle, setMovieTitle] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomWellKnownMovieTitle = async () => {
    setError(null);

    const apiKey = "277f68e7e4a806dcf0eea77c75c6391f";
    const listId = "8286021-movies";

    const endpoint = `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=en-US`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data.");
      }
      const data = await response.json();
      const randomMovieIndex = Math.floor(Math.random() * data.items.length);
      const title = data.items[randomMovieIndex]?.title || "";
      setMovieTitle(title);
      setDisplayedTitle(title.split(""));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWellKnownMovieTitle();
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter((prevLetters) => {
      if (prevLetters.includes(letter)) {
        return prevLetters.filter((i) => i !== letter);
      } else {
        return [...prevLetters, letter];
      }
    });
    setMovesCount((prevMoves) => prevMoves + 1);

    const updatedTitle = [...displayedTitle];
    for (let i = 0; i < movieTitle.length; i++) {
      if (movieTitle[i].toLowerCase() === letter.toLowerCase()) {
        updatedTitle[i] = movieTitle[i];
      }
    }
    setDisplayedTitle(updatedTitle);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>Error: {error}</p>}
          {displayedTitle.map((char, index) => (
            <div key={index} style={{ display: "inline-block" }}>
              {/*Space characters in puzzle should be appearing as a space on UI but is still being displayed as an astrix*/}
              {char === " " ? (
                <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
              ) : (
                "*"
              )}
            </div>
          ))}
          <div>Moves: {movesCount}</div>
          {alphabetArray.map((letter) => (
            <div
              key={letter}
              onClick={() => handleLetterClick(letter)}
              style={{
                display: "inline-block",
                padding: "10px",
                margin: "5px",
                border: selectedLetter.includes(letter)
                  ? "1px solid red"
                  : "1px solid black",
                cursor: "pointer",
                color: selectedLetter.includes(letter) ? "red" : "black",
              }}
            >
              {letter}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SinglePlayerGamePlay;
