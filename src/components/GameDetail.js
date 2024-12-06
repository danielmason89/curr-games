import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";
// Images
import playstation from "../img/playstation.svg";
import nintendo from "../img/nintendo.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import xboxOne from "../img/4375141_logo_xbox_icon.png";
import playstation5Icon from "../img/7048152_playstation_ps5_icon.png";
import android from "../img/icons8-android-64.png";
import nintendods from "../img/icons8-nintendo-ds-50.png";
import nintendodWiiU from "../img/icons8-nintendo-wii-u-30.png";

// Star Images
import starFull from "../img/star-full.png";
import starEmpty from "../img/star-empty.png";

const GameDetail = ({ pathId }) => {
  const navigate = useNavigate();
  // Exit Detail
  const exitDetailhandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      navigate.push("/");
    }
  };

  // Get Platform Images
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "PlayStation 5":
        return playstation5Icon;

      case "Xbox One":
        return xboxOne;
      case "Xbox Series S/X":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "Android":
        return android;
      case "iOS":
      case "macOS":
        return apple;
      case "Web":
        return gamepad;
      case "Nintendo DS":
      case "Nintendo 3DS":
        return nintendods;
      case "Wii U":
      case "Wii":
        return nintendodWiiU;
      default:
      // return gamepad;
    }
  };

  // Star Logic
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />);
      }
    }
    return stars;
  };

  // Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailhandler}>
          <Detail LayoutId={pathId}>
            <Stats>
              <header>
                <motion.h3 LayoutId={`title ${pathId}`}>{game.name}</motion.h3>
              </header>
              <Info>
                <Stars>
                  <div>
                    <h3>Rating: {game.rating}</h3>
                    <div className="star">{getStars()}</div>
                  </div>
                </Stars>
                <Platforms>
                  <div>
                    <h3>Platform</h3>
                    {game.platforms &&
                      game.platforms.map((data) => (
                        <img
                          key={data.platform.id}
                          src={getPlatform(data.platform.name)}
                          title={data.platform.name}
                          alt={data.platform.name}
                        ></img>
                      ))}
                  </div>
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                LayoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.background_image}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results &&
                screen.results.map((screen) => (
                  <img
                    src={smallImage(screen.image, 1280)}
                    key={screen.id}
                    alt={screen.image}
                  />
                ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
  &::-webkit-scrollbar {
    width: 0.04rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c25353;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  border-radius: 1rem;
  padding: 1rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  z-index: 12;
  color: black;
  h3 {
    text-decoration-line: underline;
  }
  img {
    width: 100%;
    padding: 0.5rem 0;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    h3 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1rem;
      text-decoration-line: underline;
      text-align: center;
    }
    p {
      font-size: 0.75rem;
    }
    img {
      height: 25%;
    }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  h3 {
    text-decoration-line: underline;
  }
  img {
    display: inline;
    width: 2rem;
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  @media (max-width: 768px) {
    display: block;
    align-items: center;
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 4rem;
  h3 {
    font-size: 1.2rem;
  }
  img {
    height: 5rem;
    width: 3.75rem;
    margin: 1rem 0.75rem;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 0.9rem;
    }
    img {
      width: 3.25rem;
      margin: 1rem 0.75rem;
    }
    padding-left: 0rem;
  }
`;

const Stars = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 1.2rem;
  }
  img {
    margin: 1rem 0.75rem;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    img {
      width: 1.25rem;
      margin: 1.3rem 0.75rem;
    }
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
`;

const Description = styled(motion.div)`
  margin: 2rem 0rem;
  @media (max-width: 768px) {
    margin: 6rem 0rem;
  }
`;

export default GameDetail;
