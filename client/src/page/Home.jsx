import React from "react";

// Import Higher Order Component for components folder
import { PageHOC } from "../components";

const Home = () => {
  return (
    <div>
      <h1 className="text-5xl p-3">Bootcamp Gods</h1>
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Bootcamp Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game inspired by the U of M Software Development Bootcamp 2023 cohort
  </>
);
