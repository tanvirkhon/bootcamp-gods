import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Higher Order Component for components folder
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert, gameData, setErrorMessage } =
    useGlobalContext();

  //Set Player name
  const [playerName, setPlayerName] = useState("");

  // Navigation
  const navigate = useNavigate();

  //Handle Click event to find if player is connected with wallet
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 200000,
        });

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned`,
        });
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  // Check if player is connected with wallet and has a token
  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExist = await contract.getPlayerToken(walletAddress);

      if (playerExists && playerTokenExist) navigate("/create-battle");
    };
    if (contract) checkForPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

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
