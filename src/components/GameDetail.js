import React from 'react'
// Styling and Animation
import styled from 'styled-components';
import {motion} from 'framer-motion';
// Redux
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {smallImage} from '../util';
// Images
import playstation from '../img/playstation.svg';
import nintendo from '../img/nintendo.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
// Star Images
import starFull from '../img/star-full.png';
import starEmpty from '../img/star-empty.png';

const GameDetail = ({ pathId }) => {
    const history = useHistory();
    // Exit Detail
    const exitDetailhandler = (e) => {
        const element = e.target;
        if(element.classList.contains('shadow')){
            document.body.style.overflow = 'auto';
            history.push('/')
        }
    };

    // Get Platform Images
    const getPlatform = (platform) => {
        switch (platform) {
          case "PlayStation 4":
          case "PlayStation 5":
            return playstation;
    
          case "Xbox One":
          case "Xbox Series S/X":
            return xbox;
          case "PC":
            return steam;
          case "Nintendo Switch":
            return nintendo;
          case "iOS":
          case "macOS":
            return apple;
    
          default:
            return gamepad;
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
    const {screen, game, isLoading} = useSelector((state) => state.detail )
return (
    <>
    {!isLoading && (
    <CardShadow className='shadow' onClick={exitDetailhandler}>
        <Detail LayoutId={pathId}>
            <Stats>
                <div className="rating">
                    <motion.h3 LayoutId={`title ${pathId}`}>{game.name}</motion.h3>
                    <p>Rating: {game.rating}</p>
                    {getStars()}
                </div>
                <Info>
                    <h3>Platforms</h3>
                    <Platforms>
                        {game.platforms && game.platforms.map((data) => (
                            <img key={data.platform.id} src={getPlatform(data.platform.name)} title={data.platform.name} alt={data.platform.name}></img>
                        ))}
                    </Platforms>
                </Info>
            </Stats>
            <Media>
                <motion.img LayoutId={`image ${pathId}`} src={smallImage(game.background_image,1280)} alt={game.background_image} />
            </Media>
            <Description>
                <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
                {screen.results && screen.results.map((screen) => (
                    <img src={smallImage(screen.image,1280)}  key={screen.id} alt={screen.image} />
                ))}
            </div>
        </Detail>
    </CardShadow>
    )}
    </>
);
};

const CardShadow = styled(motion.div) `
width: 100%;
min-height: 100vh;
overflow-y: scroll;
background:rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
left: 0;
z-index: 6;
&::-webkit-scrollbar {
    width:0.5rem;
}
&::-webkit-scrollbar-thumb {
    background-color: #c25353; 
}
&::-webkit-scrollbar-track {
    background: white; 
}
`;

const Detail = styled(motion.div) `
width: 80%;
border-radius: 1rem;
padding: 2rem 5rem;
background: white;
position: absolute;
left: 10%;
z-index: 12;
color: black;
img{
    width: 100%;
}
`;

const Stats = styled(motion.div) `
display: flex;
align-items: center;
justify-content: space-between;
img{
    width: 2rem;
    height: 2rem;
    display: inline;
}
`;

const Info = styled(motion.div) `

text-align: center;
`;

const Platforms = styled(motion.div) `
display: flex;
justify-content: space-evenly;
img{
    margin-left: 3rem;
}
`;

const Media = styled(motion.div) `
margin-top: 5rem;
img{
    width: 100%;
    height: 59vh;
    object-fit: cover;
}
`;

const Description = styled(motion.div) `
margin: 5rem 0rem;
`;

export default GameDetail;
