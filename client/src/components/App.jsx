import React, { Component } from 'react';
import styled from 'styled-components';
import { Board, Piece, calculateScore } from '../lib/data';

import Game from './Game';
import Stats from './Stats';
import GameOver from './GameOver';
import NewGame from './NewGame';

window.EPOCH = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Board(),
      piece: new Piece(1 + Math.floor(Math.random() * 7)),
      nextPiece: new Piece(1 + Math.floor(Math.random() * 7)),
      speed: 300,
      score: 0,
      status: 'game-over',
      lines: 0,
      volume: true,
      leftKeyPressed: false,
      rightKeyPressed: false,
      leftKeyHeld: false,
      rightKeyHeld: false,
      userName: ''
    };
  }

  movePiece = (dir) => {
    if (this.state.piece.canMove(dir, this.state.board)) {
      let clone = this.state.piece.clone();
      clone.move(dir);
      this.setState({ piece: clone });
    }
  }

  handleKeyUp = (e) => {
    this.setState({
      leftKeyPressed: false,
      rightKeyPressed: false,
      leftKeyHeld: false,
      rightKeyHeld: false
    });
  }

  handleKeyPress = (e) => {
    const { piece, board } = this.state;

    if (e.key === 'ArrowLeft') {
      this.movePiece('left');
      this.setState({
        leftKeyHeld: e.repeat,
        leftKeyPressed: true,
      })

    }
    if (e.key === 'ArrowRight' && piece.canMove('right', board)) {
      this.movePiece('right');
      this.setState({
        rightKeyHeld: e.repeat,
        rightKeyPressed: true
      })
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

  finishPiece = () => {
    if (this.state.leftKeyPressed === true) this.movePiece('left');
    if (this.state.rightKeyPressed === true) this.movePiece('right');
    this.playSound('fallfx');
    let newBoard = this.state.board.clone();
    newBoard.addPiece(this.state.piece);
    if (newBoard.hasLines()) {
      let scoredLines = newBoard.removeLines()
      let score = calculateScore(this.state.lines, scoredLines);
      let newLines = scoredLines + this.state.lines;
      let newSpeed = 300 - Math.floor(newLines / 10) * 20;
      if (Math.floor(newLines / 10) !== Math.floor(this.state.lines / 10)) { // we leveled up!
        this.playSound('levelup');
      }
      this.setState({
        lines: newLines,
        speed: newSpeed,
        score: this.state.score + score
      });
      this.playSound('linefx');
    }
    let r = 1 + Math.floor(Math.random() * 7);
    let newPiece = new Piece(r);
    let newSpeed = 300 - Math.floor(this.state.lines / 10) * 20;
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
          if (this.state.leftKeyHeld === true) this.movePiece('left');
          if (this.state.rightKeyHeld === true) this.movePiece('right');
          if (window.EPOCH % this.state.speed === 0) {
            this.advancePiece();
          }
          setTimeout(() => this.step(), 10);
        }
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('keyup', this.handleKeyUp, false);
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
    let el = document.getElementById('myname');
    let n = this.state.userName;
    let un = (n.length > 0 ? n : (el ? el.value : 'anon'))

    this.playSound('themefx');
    let startingState = {
      board: new Board(),
      piece: this.state.nextPiece.clone(),
      nextPiece: new Piece(1 + Math.floor(Math.random() * 7)),
      speed: 300,
      status: 'playing',
      lines: 0,
      volume: true,
      userName: un
    };
    this.setState(startingState, () => this.step());
  };

  render() {
    return (
      <div>
        <HeaderContainer>
          Tetris
        </HeaderContainer>
        <Container>
          {this.state.status === 'game-over' &&
            <GameOver
              userName={this.state.userName}
              lines={this.state.lines}
              score={this.state.score}
              onClick={this.startGame}
            />}
          {this.state.status === 'not-started' &&
            <NewGame
              onClick={this.startGame}
            />}
          <SideBarContainer>
            <Stats
              lines={this.state.lines}
              score={this.state.score}
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