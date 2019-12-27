import React from "react";
import { IRoomState, Dispatch } from "./typings";

import { roomReducer } from "./reducer";

export const initialRoomState: IRoomState = {
  deckId: null,
  gameStatus: "IDLE",
  playerHand: [],
  dealerHand: [],
  dealerScore: 0,
  playerScore: 0
};

const RoomStateContext = React.createContext<IRoomState>(initialRoomState);
const RoomDispatchContext = React.createContext<Dispatch>(() => {});

const RoomProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(roomReducer, initialRoomState);
  return (
    <RoomStateContext.Provider value={state}>
      <RoomDispatchContext.Provider value={dispatch}>
        {children}
      </RoomDispatchContext.Provider>
    </RoomStateContext.Provider>
  );
};

const useRoomContext = (): [IRoomState, Dispatch] => {
  const state = React.useContext(RoomStateContext);
  const dispatch = React.useContext(RoomDispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("Room Context have to be used within RoomProvider");
  }
  return [state, dispatch];
};

export { RoomProvider, useRoomContext };
