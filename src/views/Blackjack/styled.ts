import styled from "styled-components";

export const ActionSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  margin: 15px;
  max-width: 780px;
`;

export const PlayButton = styled.button`
  font-weight: bold;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.65);
  padding: 5px 20px;
  border-radius: 20px;
  font-size: 14px;
  background-color: coral;
  height: 45px;
`;

export const CardSection = styled.div`
  height: 35%;
  position: relative;
  width: 100%;
  max-width: 780px;
`;

interface PositionedPlayingCardProps {
  pos: number;
  facedown?: boolean;
}

export const PositionedPlayingCard = styled.img`
  @keyframes CardAppearence {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 10px;
  left: ${(props: PositionedPlayingCardProps) => props.pos * 30 + 30}px;
  animation: CardAppearence 400ms ease;
`;

export const GameStatus = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.65);
  padding: 0px 20px;
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
`;
