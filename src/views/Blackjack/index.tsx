import React from "react";
import RoomWrapper from "../../components/RoomWrapper";
import { useRoomContext } from "../../providers/room";
import {
  initGame,
  drawPlayerCard,
  drawDealerCard
} from "../../providers/room/actions";
import {
  CardSection,
  PositionedPlayingCard,
  GameStatus,
  ActionSection,
  PlayButton
} from "./styled";
import { GAME_STATUS_I18N } from "../../i18n";

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
      <h5 style={{ fontWeight: "bold", margin: "10px" }}>Dealer</h5>
      <CardSection>
        {roomState.dealerHand.map((card, index) => (
          <PositionedPlayingCard
            key={index}
            pos={index}
            src={
              index === 0 && roomState.gameStatus === "PLAYERS_TURN"
                ? "/backcard.jpg"
                : card.image
            }
          />
        ))}
      </CardSection>
      <GameStatus key={roomState.gameStatus}>
        {GAME_STATUS_I18N[roomState.gameStatus]}
      </GameStatus>
      <CardSection>
        {roomState.playerHand.map((card, index) => (
          <PositionedPlayingCard key={index} pos={index} src={card.image} />
        ))}
      </CardSection>
      <ActionSection>
        {roomState.gameStatus === "PLAYERS_TURN" ? (
          <React.Fragment>
            <PlayButton onClick={stand}>
              Stand ({roomState.playerScore})
            </PlayButton>
            <PlayButton style={{ backgroundColor: "gold" }} onClick={hit}>
              Hit{" "}
            </PlayButton>
          </React.Fragment>
        ) : (
          <PlayButton
            style={{ backgroundColor: "bisque" }}
            onClick={launchGame}
          >
            Play Party
          </PlayButton>
        )}
      </ActionSection>
    </RoomWrapper>
  );
};

export default BlackJackRoom;
