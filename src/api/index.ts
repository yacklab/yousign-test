import { ICard } from "../providers/room/typings";

interface IDeckResponse {
  remaining: number;
  shuffled?: boolean;
  deck_id: string;
  success: boolean;
}
interface ICardResponse extends IDeckResponse {
  cards: ICard[];
}

export const getCardFromDeck = async (deckId: string): Promise<ICardResponse> =>
  await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  ).then(r => r.json());

// return a shuffled new deck with 3 drawn cards
export const getDeck = async (): Promise<ICardResponse> =>
  await fetch(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=3&deck_count=6"
  ).then(r => r.json());
