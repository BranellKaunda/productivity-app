"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [playerPick, setPlayerPick] = useState<PlayerDetails[]>([]); //player selected after searching
  const [isAdded, setIsAdded] = useState(false);
  const [playerImage, setPlayerImage] = useState("/images/player.png");
  const [fetchImg, setFetchImg] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  interface PlayerDetails {
    name: string;
    id: number;
  }

  //type is going to be an array of playerDetails type
  let player: PlayerDetails[] = [];

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-players-search",
      params: { search: `${inputValue}` },
      headers: {
        "x-rapidapi-key": "4e111a6802mshc49aeb0b7139532p1c2a8bjsn3cd88b0a1a67",
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      },
    };

    const debounceFetch = setTimeout(async () => {
      try {
        const response = await axios.request(options);
        setData(response.data.response.suggestions);

        if (inputValue == "") {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000);

    return () => clearTimeout(debounceFetch);
  }, [inputValue]);

  useEffect(() => {
    setIsSearched(true);
  }, [data]);

  player = [...data];

  const fecthImages = async (param: PlayerDetails) => {
    setFetchImg(true);
    //using selected player id to fetch player images from API
    const options = {
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-player-logo",
      params: { playerid: `${param.id}` },
      headers: {
        "x-rapidapi-key": "4e111a6802mshc49aeb0b7139532p1c2a8bjsn3cd88b0a1a67",
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      //response saved in variable "image". updated player image state
      const image = response.data.response.url;
      setPlayerImage(image);

      //ReactDOM.preload(image, { as: "image" });
    } catch (error) {
      console.error(error);
    }
  };

  const addPlayer = (value: PlayerDetails): void => {
    //add player to playerPick state variable
    setIsAdded(true);

    if (value) {
      setPlayerPick((prev) => prev.concat(value));
      fecthImages(value);
    }
  };

  return (
    <>
      <nav>
        <button className="menu-logo">
          <Image
            src="/images/menu.png"
            alt="menu logo"
            width={32}
            height={32}
            priority
            style={{ objectFit: "cover" }}
          />
        </button>

        <div className="points">
          <div className="points-logo">
            <Image
              src="/images/points.png"
              alt="points image"
              width={22}
              height={22}
              style={{ objectFit: "cover" }}
            />
          </div>

          <p>1236</p>
        </div>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search player"
          onChange={handleChange}
        />

        <div className="search-img">
          <Image
            src="/images/search.png"
            alt="search icon"
            width={20}
            height={20}
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/*mapping over the array to render only 3 top search results by using the index*/}
        <div className="search-results">
          {isSearched &&
            player.map(
              (value, i) =>
                i < 3 && (
                  <div
                    key={value.id}
                    onClick={() => {
                      addPlayer(value);
                    }}
                  >
                    {value.name}
                  </div>
                )
            )}
        </div>
      </div>

      <div className="container">
        <div className="player-img">
          <Image
            src={playerImage}
            alt="menu logo"
            width={200}
            height={200}
            priority
            quality={100}
            style={{ objectFit: "cover", borderRadius: "4%" }}
          />
        </div>

        <div>
          {isAdded &&
            playerPick.map((player) => (
              <p key={player.id}>
                {player.name} id:{player.id}
              </p>
            ))}
        </div>

        <div className="timer">
          <h1>00:00</h1>
        </div>

        <button>Start</button>
      </div>
    </>
  );
}
