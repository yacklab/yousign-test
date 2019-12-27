import React from "react";
import styled from "styled-components";
import RoomWrapper from "../../components/RoomWrapper";
import PlayingCard from "../../components/PlayingCard";
import { useRoomContext } from "../../providers/room";
import {
  initGame,
  drawPlayerCard,
  drawDealerCard
} from "../../providers/room/actions";

const DealerSection = styled.div`
  display: grid;
  width: 100%;
  height: 33%;
  grid-gap: 4px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 50%;
  & > * {
    justify-self: center;
  }
`;
const PlayerSection = styled.div`
  display: grid;
  width: 100%;
  padding: 5px 0;
  height: calc(42% - 10px);
  grid-gap: 4px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 50%;
  & > * {
    justify-self: center;
  }
`;
const ActionSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  margin: 15px;
`;
const PlayButton = styled.button`
  background: none;
  border: 0;
  border-radius: 20px;
  font-size: 16px;
  color: #675374;
  padding: 8px 15px;
  cursor: pointer;
  outline: none;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  height: 35px;
`;

const BlackJackRoom = () => {
  const [roomState, dispatch] = useRoomContext();

  const launchGame = () => {
    initGame(dispatch, roomState);
  };
  const hit = () => {
    drawPlayerCard(dispatch, roomState);
  };
  const stand = () => {
    drawDealerCard(dispatch, roomState);
  };

  return (
    <RoomWrapper>
      {roomState.gameStatus}
      <DealerSection>
        {roomState.dealerHand.map((card, index) => (
          <PlayingCard
            key={index}
            facedown={index === 0 && roomState.gameStatus === "PLAYERS_TURN"}
            src={card.image}
          />
        ))}
      </DealerSection>
      <PlayerSection>
        {roomState.playerHand.map((card, index) => (
          <PlayingCard key={index} src={card.image} />
        ))}
      </PlayerSection>
      <ActionSection>
        {roomState.gameStatus === "PLAYERS_TURN" ? (
          <React.Fragment>
            <PlayButton onClick={hit}>Hit</PlayButton>
            <PlayButton onClick={stand}>Stand</PlayButton>
          </React.Fragment>
        ) : (
          <PlayButton onClick={launchGame}>Play Party</PlayButton>
        )}
      </ActionSection>
    </RoomWrapper>
  );
};

export default BlackJackRoom;
