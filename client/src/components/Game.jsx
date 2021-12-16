import React from 'react'
import styled from 'styled-components'

const Game = ({ data }) => {
  return (
    <Container>
      {data.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Cell background={randomColor} key={rowIndex * 20 + colIndex}>
            {rowIndex},{colIndex}
          </Cell>
        ))
      )}
    </Container>
  )
}


let randomColor = () => {
  let colors = ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
`

const Cell = styled.div`
  width: 30px;
  height: 30px;
  font-size: 8px;
  margin: 0px;
  padding: 0px;
  background-color: ${props => props.background}
`;



export default Game