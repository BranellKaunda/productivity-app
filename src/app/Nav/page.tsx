"use client";
import Image from "next/image";

const Page = () => {
  return (
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

      <div className="menu">
        <ul>
          <li>HOME</li>
          <li>TEAM</li>
          <li>HOW TO PLAY</li>
        </ul>
      </div>
    </nav>
  );
};

export default Page;
