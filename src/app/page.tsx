"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Timer from "./Timer/page";
import Team from "./Team/page";
import Points from "./Points/page";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [playerPick, setPlayerPick] = useState<PlayerDetails[]>([]); //player selected after searching
  const [isAdded, setIsAdded] = useState(false);
  const [playerImage, setPlayerImage] = useState("/images/player.png");
  const [squad, setSquad] = useState<PlayerDetails[]>([]);
  const [points, setPoints] = useState<number>(0);
  //const [isPlayerLocked, setIsPlayerLocked] = useState(false);

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
    } catch (error) {
      console.error(error);
    }
  };

  //adds player you picked to squad after time is up
  const addToSquad = () => {
    //setPlayerImage("/images/player.png");
    setSquad(playerPick);
    setIsAdded(false); //toggle locked player style
    setPoints((prev) => prev + 100); //adds 100 points every time you unlock player
  };

  const addPlayer = (value: PlayerDetails): void => {
    setIsSearched(false);
    //add player to playerPick state variable
    setIsAdded(true);

    if (value) {
      setPlayerPick((prev) =>
        prev.includes(value) ? prev : prev.concat(value)
      ); //checks if the player was already picked. if prev values includes that player then return or keep that prev player
      //else add the new player to the state
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

        <Points points={points} />
      </nav>

      <div className="search-bar">
        <input
          type="text"
          spellCheck="false"
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
                  <p
                    key={value.id}
                    onClick={() => {
                      addPlayer(value);
                    }}
                  >
                    {value.name}
                  </p>
                )
            )}
        </div>
      </div>

      <div className="container">
        <div className="player-img" style={{ position: "relative" }}>
          <Image
            src={playerImage}
            alt="menu logo"
            fill
            sizes="100%"
            priority
            style={{ objectFit: "cover", borderRadius: "4%" }}
          />

          <div
            className="locked-player"
            style={isAdded ? { display: "block" } : { display: "none" }}
          >
            <Image
              src="/images/lock.png"
              alt="menu logo"
              height={40}
              width={40}
              sizes="100%"
              priority
              style={{
                objectFit: "cover",
                borderRadius: "4%",
                margin: "auto",
                transform: "translateY(200%)",
              }}
            />
          </div>
        </div>

        <Timer addToSquad={addToSquad} />
      </div>

      <Team squad={squad} />
    </>
  );
}
