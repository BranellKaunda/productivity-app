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
            width={22}
            height={22}
            style={{ objectFit: "cover" }}
          />
        </div>

        <p>{points}</p>
      </div>
    </>
  );
};

export default Points;
