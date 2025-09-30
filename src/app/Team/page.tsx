"use client";
import { useState } from "react";

const Team = ({ squad }: { squad: string[] }) => {
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

  if (!squad || !Array.isArray(squad)) {
    return <p>No team data available.</p>;
  }

  return (
    <>
      <h1 className="team-management">TEAM MANAGEMENT</h1>
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
          {squad.length > 0 &&
            squad.map((player, i) => (
              <li
                key={i}
                onClick={() => {
                  setIsClicked(true);
                  setSubIn(player);
                  setSubbedPlayers((prev) =>
                    subbedPlayers.includes(player) //keeps track of players subbed in
                      ? prev
                      : [...prev, player]
                  );
                }}
                style={{
                  color: subbedPlayers.includes(player) ? "green" : "black",
                  opacity: subbedPlayers.includes(player) ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {player}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Team;
