import React, { useState } from "react";

// Import Higher Order Component for components folder
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();

  //Set Player name
  const [playerName, setPlayerName] = useState("");

  //Handle Click event to find if player is connected with wallet
  const handleClick = async () => {
    try {
      console.log({ contract });
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: "true",
          type: "info",
          message: `${playerName} is being summoned`,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
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
