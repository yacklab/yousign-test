import React from "react";
import styled from "styled-components";

interface PlayingCardProps {
  src: string;
  facedown?: boolean;
}

const BackCard = styled.div`
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(#e66465, #9198e5);
`;

const PlayingCard: React.FunctionComponent<PlayingCardProps> = ({
  src,
  facedown
}) => {
  return (
    <BackCard>
      <img
        style={{ opacity: facedown ? 0 : 1 }}
        height="100%"
        src={src}
        alt=""
      />
    </BackCard>
  );
};

export default PlayingCard;
