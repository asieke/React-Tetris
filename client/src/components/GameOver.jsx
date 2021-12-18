import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios'

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highScores: []
    };
  }

  componentDidMount() {
    axios.post('/highscore', this.props)
      .then((response) => {
        this.setState({ highScores: response.data })
      })
      .catch((error) => {
        console.log('error');
      })
  }

  render() {
    console.log(this.state.highScores)
    const { userName, lines, score, onClick } = this.props;
    return (
      <Overlay>
        <h1>Game Over</h1>
        <h3>Nice Game {userName}<br />Lines: {lines}, Score: {score} </h3>
        <h4>High Scores</h4>
        <HighTable>

          <tbody>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Lines</th>
              <th>Score</th>
            </tr>
            {this.state.highScores.map((x, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.userName}</td>
                <td>{x.lines}</td>
                <td>{x.score}</td>
              </tr>
            ))}
          </tbody>
        </HighTable>
        <PlayAgain onClick={onClick}>Play Again</PlayAgain>
      </Overlay>
    )
  }
}

export default GameOver

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  width: 450px;
  height: 600px;
  background-color: black;
  opacity: 0.8;
  color: white;
  text-align: center;
  h1{
    font-size: 30px;
    color: white;
    background-color: #8e44ad;
    width: 240px;
    padding: 5px;
    margin: 15px auto;
  };
  h4{
    font-size: 20px;
    color: white;
    background-color: #c0392b;
    width: 240px;
    padding: 5px;
    margin: 20px auto;
  };
  h3{
    line-height: 25px;
  }
`;

const HighTable = styled.table`
  color: white;
  margin: 0px auto;
  border: 1px solid #333;
  border-collapse: collapse;

  td, th {
    text-align: center;
    border: 1px solid #333;
    padding: 3px;
  };

  th {
    background-color: #2980b9;
  };
`;

const PlayAgain = styled.button`
  background-color: #27ae60;
  padding: 5px 20px;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: darkgreen;
    cursor: pointer;
  };
`;
