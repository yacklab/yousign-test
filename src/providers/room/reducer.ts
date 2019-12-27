import { IRoomState, RoomAction } from "./typings";
import { initialRoomState } from ".";

export const roomReducer = (state: IRoomState, action: RoomAction) => {
  switch (action.type) {
    case "INIT_GAME":
      return {
        ...initialRoomState,
        deckId: action.payload.deckId,
        gameStatus: "PLAYERS_TURN",
        dealerHand: action.payload.dealerHand,
        playerHand: action.payload.playerHand,
        playerScore: action.payload.playerScore,
        dealerScore: action.payload.dealerScore
      } as IRoomState;
    case "DRAW_PLAYER_CARD":
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
        playerHand: action.payload.playerHand,
        playerScore: action.payload.score
      };
    case "DRAW_DEALER_CARD":
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
        dealerHand: action.payload.dealerHand,
        dealerScore: action.payload.score
      };
    default:
      throw new Error(`Action don't exist`);
  }
};
