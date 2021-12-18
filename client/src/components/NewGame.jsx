import React from 'react'
import styled from 'styled-components';

let NewGame = ({ onClick }) => {
  return (
    <Overlay>
      <h1>Welcome to Tetris</h1>
      <h3>Enter your Name</h3>
      <input type='text' id='myname' autocomplete="off"></input>
      <button onClick={onClick}>Start Game</button>
    </Overlay>
  )
}

export default NewGame

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