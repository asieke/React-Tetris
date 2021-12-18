import React, { Component } from 'react';
import styled from 'styled-components';
import { Board, Piece } from '../lib/data';

import Game from './Game';
import Stats from './Stats';

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
      volume: true
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
    if (e.key === 'ArrowDown' && piece.canMove('down', board)) {
      let clone = piece.clone();
      clone.move('down');
      this.setState({
        piece: clone
      });
    }
    if (e.key === 'a' && piece.canRotate('clockwise', board)) {
      console.log('rotating piece');
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
      document.getElementById(id).play();
    }
  }

  step() {
    if (this.state.status === 'not-started') {
      console.log('time to start');
    } else {
      if (this.state.board.isGameOver()) {
        this.gameOver();
      } else {
        if (this.state.piece.isDone(this.state.board)) {
          this.playSound('fallfx');
          let newBoard = this.state.board.clone();
          newBoard.addPiece(this.state.piece);
          if (newBoard.hasLines()) {
            let newLines = newBoard.removeLines() + this.state.lines;
            let newSpeed = 200 - Math.floor(newLines / 10) * 20;
            if (newSpeed !== this.state.speed) { // we leveled up!
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
          this.setState({
            nextPiece: newPiece,
            piece: this.state.nextPiece.clone(),
            board: newBoard
          });
          setTimeout(() => this.step(), this.state.speed);
        } else {
          let clone = this.state.piece.clone();
          clone.move('down');
          this.setState({
            piece: clone,
          });
          setTimeout(() => this.step(), this.state.speed);
        }
      }
    }
  }

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
    this.setState({ status: 'playing' }, () => this.step());
  };

  render() {
    return (
      <div>
        <HeaderContainer>
          Tetris
          <StepButton onClick={this.startGame}>Start</StepButton>
        </HeaderContainer>
        <Container>
          <StatsContainer>
            {this.state.status === 'game-over' && (
              <GameOver>Game Over</GameOver>
            )}
            <Stats
              lines={this.state.lines}
              next={this.state.nextPiece}
              speed={this.state.speed} />
          </StatsContainer>
          <GameContainer>
            {this.state.status !== 'not-started' && <Game board={this.state.board} piece={this.state.piece} />}
          </GameContainer>
        </Container>

      </div>
    );
  }
}

const GameOver = styled.div`
  width: 100%;
  height: 100px;
  background-color: yellow
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

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 15px;
  background-color: #333;
  color: #eee;
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
  background-color: lightgreen;
  border: 0px;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export default App;