import React from 'react'
import styled from 'styled-components'

const bgs = ['#222', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6'];

const Game = ({ board, piece }) => {
  return (
    <Container>
      {board.data.map((val, index) => {
        //if we're printing the cell that contains the current piece
        if (piece.getCells().includes(index)) {
          return <Piece color={bgs[piece.id]} key={index} />
        } else {
          return val === 0
            ? <Cell color={bgs[val]} key={index} />
            : <Piece color={bgs[val]} key={index} />
        }
      })
      }

    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Cell = styled.div`
  width: 30px;
  height: 30px;
  font-size: 8px;
  margin: 0px;
  padding: 0px;
  background-color: ${props => props.color};
`;

const Piece = styled.div`
  width: 30px;
  height: 30px;
  font-size: 8px;
  margin: 0px;
  padding: 0px;
  background-color: ${props => props.color};
  box-shadow: inset 1px 1px 2px -1px
`;


export default Game