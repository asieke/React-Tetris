import React, { Component } from 'react';
import styled from 'styled-components'
import { InitialData } from '../lib/data'

import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: InitialData.map(x => x.slice())
    }
  }

  render() {
    return (
      <div>
        <HeaderContainer>
          Tetris
        </HeaderContainer>
        <Container>
          <StatsContainer>
            Stats go here
          </StatsContainer>
          <GameContainer>
            <Game data={this.state.data} />
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
`

const StatsContainer = styled.div`
  display: flex;
  width: 130px;
  padding: 10px;
  background-color: #333;
  color: #eee;
`;

const GameContainer = styled.div`
  display: flex;
  width: 300px;
  height: 600px;
`;

export default App;