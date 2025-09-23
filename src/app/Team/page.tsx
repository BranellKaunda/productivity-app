"use client";
import { useEffect, useState } from "react";

interface PlayerDetails {
  name: string;
  id: number;
}

const Team = ({ squad }: { squad: PlayerDetails[] }) => {
  const [subIn, setSubIn] = useState(""); //used to select player from list to add to position
  const [subout, setSubOut] = useState("");
  //const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [subbedPlayers, setSubbedPlayers] = useState<string[]>([]);
  const [positions, setPositions] = useState([
    "gk",
    "lb",
    "cb",
    "cb",
    "rb",
    "lm",
    "rcm",
    "lcm",
    "rm",
    "lf",
    "rf",
  ]);
  const [isClicked, setIsClicked] = useState(false);
  // const [isSubbedOn, setIsSubbedOn] = useState(false);

  useEffect(() => {
    console.log(squad);
  }, [squad]);

  const substitution = (playerIn: string, index: number) => {
    setIsClicked(false);
    const replacedPlayer = positions[index]; // get the player being replaced

    const replacePlayer = [
      ...positions.slice(0, index),
      playerIn,
      ...positions.slice(index + 1),
    ]; //replaces value at specific index with the player from squad list (subIn)

    setPositions((prev) =>
      positions.includes(playerIn) ? prev : replacePlayer
    ); //avoid adding the same player twice to the line up

    // Remove replaced player from subbedPlayers
    if (isClicked) {
      setSubbedPlayers((prev) =>
        prev.includes(replacedPlayer)
          ? prev.filter((p) => p !== replacedPlayer)
          : prev
      );
    }
  };

  return (
    <div className="team-container">
      <div className="line-up">
        {positions.map((position, i) => (
          <div key={i} onClick={() => substitution(subIn, i)}>
            {position}
          </div>
        ))}
      </div>

      <div className="squad-list">
        <h1>Squad List</h1>
        <ul>
          {squad.map(
            (player, i) =>
              i < 12 && (
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
                    console.log(subbedPlayers);
                  }}
                  style={{
                    color: subbedPlayers.includes(player.name)
                      ? "green"
                      : "black",
                    opacity: subbedPlayers.includes(player.name) ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {player.name}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Team;
