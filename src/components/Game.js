import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { popUp } from "../animations";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();
  // Load Detail Handler
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame
      variants={popUp}
      initial="hidden"
      animate="show"
      LayoutId={stringPathId}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 LayoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          LayoutId={`image ${stringPathId}`}
          src={smallImage(image, 1280)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 1rem;
  h3 {
    font-size: 0.9rem;
  }
  p {
    font-size: 1rem;
  }

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  &:hover {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
    border: 0.05rem solid #000000;
  }
  @media (max-width: 768px) {
    img {
      height: 25vh;
    }
    h3 {
      font-size: 0.65rem;
      text-align: center;
    }
    p {
      font-size: 0.55rem;
      text-align: center;
    }
  }
`;

export default Game;
