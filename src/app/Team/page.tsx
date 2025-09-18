"use client";
//import { useEffect, useState } from "react";

interface PlayerDetails {
  name: string;
  id: number;
}

const Team = ({ squad }: { squad: PlayerDetails[] }) => {
  return (
    <div className="team-container">
      <div className="squad-list">
        <h1>this is my team</h1>

        {squad.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Team;
