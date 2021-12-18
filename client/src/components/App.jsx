import React, { Component } from 'react';
import styled from 'styled-components';
import { Board, Piece } from '../lib/data';

import Game from './Game';
import Stats from './Stats';

window.EPOCH = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Board(),
      piece: new Piece(1 + Math.floor(Math.random() * 7)),
      nextPiece: new Piece(1 + Math.floor(Math.random() * 7)),
      speed: 200,
      status: 'not-started',
      lines: 0,
      volume: false
    };
  }

  handleKeyPress = (e) => {
    const { piece, board } = this.state;

    if (e.key === 'ArrowLeft' && piece.canMove('left', board)) {
      let clone = piece.clone();
      clone.move('left');
      this.setState({
        piece: clone
      });
    }
    if (e.key === 'ArrowRight' && piece.canMove('right', board)) {
      let clone = piece.clone();
      clone.move('right');
      this.setState({
        piece: clone
      });
    }
    if (e.key === 'ArrowDown') {
      this.setState({
        speed: 10
      });
    }
    if (e.key === 'a' && piece.canRotate('clockwise', board)) {
      let clone = piece.clone();
      clone.rotate('clockwise');
      this.setState({
        piece: clone
      });
    }
    if (e.key === 's' && piece.canRotate('counter', board)) {
      let clone = piece.clone();
      clone.rotate('counter');
      this.setState({
        piece: clone
      });
    }
  };

  playSound(id) {
    if (this.state.volume) {
      let el = document.getElementById(id);
      el.play();
      el.volume = (id === 'themefx' ? '0.1' : '1');
    }
  }

  finishPiece() {
    this.playSound('fallfx');
    let newBoard = this.state.board.clone();
    newBoard.addPiece(this.state.piece);
    if (newBoard.hasLines()) {
      let newLines = newBoard.removeLines() + this.state.lines;
      let newSpeed = 200 - Math.floor(newLines / 10) * 20;
      if (Math.floor(newLines / 10) !== Math.floor(this.state.lines / 10)) { // we leveled up!
        this.playSound('levelup');
      }
      this.setState({
        lines: newLines,
        speed: newSpeed
      });
      this.playSound('linefx');
    }
    let r = 1 + Math.floor(Math.random() * 7);
    let newPiece = new Piece(r);
    let newSpeed = 200 - Math.floor(this.state.lines / 10) * 20;
    this.setState({
      nextPiece: newPiece,
      piece: this.state.nextPiece.clone(),
      board: newBoard,
      speed: newSpeed
    });
  }

  advancePiece() {
    let clone = this.state.piece.clone();
    clone.move('down');
    this.setState({
      piece: clone,
    });
  }

  step = () => {
    window.EPOCH += 10;
    console.log(window.EPOCH);
    if (this.state.status === 'not-started') {
      console.log('time to start');
    } else {
      if (this.state.board.isGameOver()) {
        this.gameOver();
      } else {
        if (this.state.piece.isDone(this.state.board)) {
          this.finishPiece();
          setTimeout(() => this.step(), 10);
        } else {
          if (window.EPOCH % this.state.speed === 0)
            this.advancePiece();
          setTimeout(() => this.step(), 10);
        }
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
    //the piece is in its final resting place
  }

  gameOver = () => {
    document.getElementById('themefx').pause();
    this.playSound('gameoverfx');
    this.setState({
      status: 'game-over'
    });
  };

  startGame = () => {
    this.playSound('themefx');
    let startingState = {
      board: new Board(),
      piece: this.state.nextPiece.clone(),
      nextPiece: new Piece(1 + Math.floor(Math.random() * 7)),
      speed: 200,
      status: 'playing',
      lines: 0,
      volume: true
    };
    this.setState(startingState, () => this.step());
  };

  render() {
    return (
      <div>
        <HeaderContainer>
          Tetris

          <StepButton onClick={this.startGame}>Start</StepButton>
        </HeaderContainer>
        <Container>
          {this.state.status === 'game-over' && (
            <GameOver>
              <h1>Game Over</h1>
              <h3>Final Score</h3>
              <h4>{this.state.lines}</h4>
            </GameOver>)
          }
          <SideBarContainer>
            {window.EPOCH}
            <Stats
              lines={this.state.lines}
              next={this.state.nextPiece}
            />
          </SideBarContainer>
          <GameContainer>
            {this.state.status !== 'not-started' && <Game board={this.state.board} piece={this.state.piece} />}
          </GameContainer>
        </Container>

      </div>
    );
  }
}

const GameOver = styled.div`
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
  }
`;

const Container = styled.div`
  display: flex;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 430px;
  height: 30px;
  font-size: 30px;
  padding: 10px;
  font-family: 'Games', sans-serif;
  background-color: #444;
  color: #eee;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 15px;
  background-color: #333;
  color: #eee;
  justify-content: 'space-around';
  align-items: stretch;
`;

const GameContainer = styled.div`
  display: flex;
  width: 300px;
  height: 600px;
  background: #222;
`;

const StepButton = styled.button`
  width: 100px;
  float: right;
  margin-left: auto;
  background-color: #95a5a6;
  border: 0px;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export default App;