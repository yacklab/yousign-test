import React from "react";
import BlackJackRoom from "./views/Blackjack";
import { RoomProvider } from "./providers/room";

const App: React.FC = () => {
  return (
    <RoomProvider>
      <BlackJackRoom />
    </RoomProvider>
  );
};

export default App;
