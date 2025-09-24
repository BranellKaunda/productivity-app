"use client";
import { useEffect, useState } from "react";

interface PlayerDetails {
  name: string;
  id: number;
}

const Team = ({ squad }: { squad: PlayerDetails[] }) => {
  const [subIn, setSubIn] = useState(""); //used to select player from list to add to position
  const [subbedPlayers, setSubbedPlayers] = useState<string[]>([]);
  const [positions, setPositions] = useState([
    "GK",
    "LB",
    "LCB",
    "RCB",
    "RB",
    "LCM",
    "RCM",
    "LW",
    "RW",
    "RF",
    "LF",
  ]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log(squad);
  }, [squad]);

  const substitution = (playerIn: string, index: number) => {
    setIsClicked(false);
    const replacedPlayer = positions[index]; // get the player being replaced

    if (isClicked) {
      const replacePlayer = [
        ...positions.slice(0, index),
        playerIn,
        ...positions.slice(index + 1),
      ]; //replaces value at specific index with the player from squad list (subIn)

      setPositions((prev) =>
        positions.includes(playerIn) ? prev : replacePlayer
      ); //avoid adding the same player twice to the line up

      // subs a player off when a new player is added to its position index
      setSubbedPlayers((prev) =>
        prev.includes(replacedPlayer)
          ? prev.filter((p) => p !== replacedPlayer)
          : prev
      );
    }
  };

  return (
    <>
      <div className="team-container">
        <ul className="line-up">
          {positions.map((position, i) => (
            <li key={i} onClick={() => substitution(subIn, i)}>
              {position}
            </li>
          ))}
        </ul>

        <div className="box-circle"></div>
        <div className="center-circle"></div>
      </div>

      <div className="squad-list">
        <h1>SQUAD LIST</h1>
        <ul>
          {squad.map((player) => (
            <li
              key={player.id}
              onClick={() => {
                setIsClicked(true);
                setSubIn(player.name);
                setSubbedPlayers((prev) =>
                  subbedPlayers.includes(player.name) //keeps track of players subbed in
                    ? prev
                    : [...prev, player.name]
                );
              }}
              style={{
                color: subbedPlayers.includes(player.name) ? "green" : "black",
                opacity: subbedPlayers.includes(player.name) ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Team;
