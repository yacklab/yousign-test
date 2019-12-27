import React from "react";
import styled from "styled-components";
import RoomWrapper from "../../components/RoomWrapper";
import PlayingCard from "../../components/PlayingCard";

const DealerSection = styled.div`
  display: grid;
  width: 100%;
  height: 42%;
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
  height: 42%;
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
  height: 25%;
  margin: 15px;
`;
const PlayButton = styled.button``;

const BlackJackRoom = () => {
  const hit = () => {
    console.log("hit");
  };
  const stand = () => {
    console.log("stand  ");
  };

  return (
    <RoomWrapper>
      <DealerSection>
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
        <PlayingCard
          src="https://deckofcardsapi.com/static/img/6S.png"
          facedown
        />
      </DealerSection>
      <PlayerSection>
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
        <PlayingCard src="https://deckofcardsapi.com/static/img/6S.png" />
      </PlayerSection>
      <ActionSection>
        <PlayButton onClick={hit}>Hit</PlayButton>
        <PlayButton onClick={stand}>Stand</PlayButton>
      </ActionSection>
    </RoomWrapper>
  );
};

export default BlackJackRoom;
