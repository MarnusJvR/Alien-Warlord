// I still want to update the game to turn this live
// but for now its just a static leader board
import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Rank from "./Rank";

// defining the leaderboardTitle constant to set how the leaderboard title will look like
const Leaderboard = (props) => {
  const style = {
    fill: 'transparent',
    stroke: 'black',
    strokeDasharray: '15',
  };

  const leaderboardTitle = {
    fontFamily: '"Joti One", cursive',
    fontSize: 50,
    fill: '#88da85',
    cursor: 'default',
  };
//  calling the sort function of the props.leaderboard variable to order the ranking.
  let leaderboard = props.leaderboard || [];
  leaderboard = leaderboard.sort((prev, next) => {
    if (prev.maxScore === next.maxScore) {
      return prev.name <= next.name ? 1 : -1;
    }
    return prev.maxScore < next.maxScore ? 1 : -1;
  }).map((member, index) => ({
    ...member,
    rank: index + 1,
    currentPlayer: member.id === props.currentPlayer.id,
  })).filter((member, index) => {
    if (index < 4 || member.id === props.currentPlayer.id) return member;
    return null;
  });

  return (
    <g>
      <text filter="url(#shadow)" style={leaderboardTitle} x="-150" y="-630">Leaderboard</text>
      <rect style={style} x="-350" y="-600" width="700" height="330" />
      {
        props.currentPlayer && leaderboard.map((player, idx) => {
          const position = {
            x: -100,
            y: -530 + (70 * idx)
          };
          return <Rank key={player.id} player={player} position={position}/>
        })
      }
      {
        ! props.currentPlayer && <Login authenticate={props.authenticate} />
      }
    </g>
  );
};

Leaderboard.propTypes = {
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  authenticate: PropTypes.func.isRequired,
  leaderboard: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    ranking: PropTypes.number,
  })),
};

Leaderboard.defaultProps = {
  currentPlayer: null,
  leaderboard: null,
};

export default Leaderboard;