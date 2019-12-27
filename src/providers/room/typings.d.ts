interface ICardImages {
  png: string;
  svg: string;
}

export interface ICard {
  value: string;
  code: string;
  images: ICardImages;
  image: string;
  suit: string;
}
export interface IRoomState {
  deckId: string | null;
  gameStatus: GameStatus;
  playerHand: ICard[];
  dealerHand: ICard[];
  playerScore: number;
  dealerScore: number;
}

export type GameStatus =
  | "IDLE"
  | "PLAYERS_TURN"
  | "DEALERS_TURN"
  | "PLAYER_WON"
  | "DEALER_WON";

export type Dispatch = (action: RoomAction) => void;

export type RoomAction =
  | {
      type: "INIT_GAME";
      payload: {
        deckId: string;
        playerHand: ICard[];
        dealerHand: ICard[];
        playerScore: number;
        dealerScore: number;
      };
    }
  | {
      type: "DRAW_PLAYER_CARD";
      payload: { playerHand: ICard[]; score: number; gameStatus: GameStatus };
    }
  | {
      type: "DRAW_DEALER_CARD";
      payload: { dealerHand: ICard[]; score: number; gameStatus: GameStatus };
    };
