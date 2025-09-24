"use client";
import Image from "next/image";

interface Points {
  points: number;
}

const Points = ({ points }: Points) => {
  return (
    <>
      <div className="points">
        <div className="points-logo">
          <Image
            src="/images/points.png"
            alt="points image"
            width={30}
            height={30}
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1>{points}</h1>
      </div>
    </>
  );
};

export default Points;
