import React from 'react'
import styled from 'styled-components';

let GameOver = ({ userName, lines, score }) => {
  return (
    <Overlay>
      <h1>Game Over</h1>
      <h3>Final Score</h3>
      <h4>{lines}</h4>
      <h4>{score}</h4>
    </Overlay>
  )
}

export default GameOver

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  width: 450px;
  height: 600px;
  background-color: black;
  opacity: 0.6;
  color: white;
  text-align: center;
  h1{
    font-size: 60px;
  };
  h3{
    font-size: 45px;
  };
  h4{
    font-size: 40px;
  };
  input, button {
    padding: 20;
    font-size: 32;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    width: 60%;
  };
  button {
    background-color: green;
    margin-top: 30px;
    color: white;
    font-weight: bold;
  };
  button:hover {
    cursor: pointer;
    background-color: darkgreen;
  }
`;