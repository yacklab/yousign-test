import { ICard, Dispatch, IRoomState, GameStatus } from "./typings";
import * as API from "../../api";

const API_HEADS_CODE = ["JACK", "QUEEN", "KING"];
const BLACK_JACK_MAX_SCORE = 21;

const calculateScore = (hand: ICard[]): number => {
  const [aces, nonAcesCard] = hand.reduce(
    (acc, card) => {
      if (card.value === "ACE") {
        acc[0].push(card);
      } else {
        acc[1].push(card);
      }
      return acc;
    },
    [[], []] as ICard[][]
  );
  const nonAcesScore = nonAcesCard.reduce((acc, card) => {
    const intValue = parseInt(card.value, 10);
    if (!isNaN(intValue)) {
      return acc + intValue;
    }
    if (API_HEADS_CODE.includes(card.value)) {
      return acc + 10;
    }
    return acc;
  }, 0);

  if (aces.length === 0) {
    return nonAcesScore;
  } else {
    // Possible Aces cumulated value is equal to the number of aces + 10 or the number of aces
    // Since no more than one ace can be treated as an 11
    // (two aces would give 22 and would result in a game over state)
    const ACES_MAX_ADDED_VALUE = 10;
    return nonAcesScore + aces.length + ACES_MAX_ADDED_VALUE >
      BLACK_JACK_MAX_SCORE
      ? nonAcesScore + aces.length
      : nonAcesScore + aces.length + ACES_MAX_ADDED_VALUE;
  }
};

export const initGame = async (dispatch: Dispatch, roomState: IRoomState) => {
  const deck = await API.getDeck();
  const playerHand: ICard[] = [deck.cards[0]];
  const dealerHand: ICard[] = [deck.cards[1], deck.cards[2]];
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);
  dispatch({
    type: "INIT_GAME",
    payload: {
      deckId: deck.deck_id,
      playerHand,
      dealerHand,
      playerScore,
      dealerScore
    }
  });
};

export const drawPlayerCard = async (
  dispatch: Dispatch,
  roomState: IRoomState
) => {
  if (!roomState.deckId) {
    throw new Error("You can't draw a player card without a deck");
  }
  const deck = await API.getCardFromDeck(roomState.deckId);
  const playerHand = [...roomState.playerHand, deck.cards[0]];
  const score = calculateScore(playerHand);
  const gameStatus =
    score > BLACK_JACK_MAX_SCORE ? "DEALER_WON" : "PLAYERS_TURN";
  dispatch({
    type: "DRAW_PLAYER_CARD",
    payload: { gameStatus, playerHand, score }
  });
};

export const drawDealerCard = async (
  dispatch: Dispatch,
  roomState: IRoomState
) => {
  if (!roomState.deckId) {
    throw new Error("You can't draw a player card without a deck");
  }
  const dealerHand = [...roomState.dealerHand];
  let score = calculateScore(dealerHand);
  while (score < roomState.playerScore) {
    const deck = await API.getCardFromDeck(roomState.deckId);
    dealerHand.push(deck.cards[0]);
    score = calculateScore(dealerHand);
    let gameStatus: GameStatus = "DEALERS_TURN";
    if (score > BLACK_JACK_MAX_SCORE) {
      gameStatus = "PLAYER_WON";
    } else if (score >= roomState.playerScore) {
      gameStatus = "DEALER_WON";
    } else {
      gameStatus = "DEALERS_TURN";
    }
    dispatch({
      type: "DRAW_DEALER_CARD",
      payload: { gameStatus, dealerHand, score }
    });
  }
};
