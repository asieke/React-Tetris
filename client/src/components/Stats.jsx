import React from 'react';
import styled from 'styled-components';

const bgs = ['rgba(0,0,0,0.0)', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6'];

const piecePreviews = [
  null,
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]
];

let Stats = ({ lines, next, speed }) => {

  let preview = piecePreviews[next.id];
  // let preview = piecePreviews[4];

  return (
    <Container>
      <Text>Next Piece</Text>
      <PieceContainer size={preview.length}>
        {preview.map((x, i) => (
          x === 0
            ? <Blank key={i} />
            : <Piece key={i} color={bgs[next.id]}></Piece>

        ))}
      </PieceContainer>
      <Text>Lines</Text>
      <Data>{lines}</Data>
      <Text>Level</Text>
      <Data>{Math.floor(lines / 10)}</Data>
      <Controls>
        <h3>Controls</h3>
        <table>
          <tbody>
            <tr><td>Left</td><td>⬅️</td></tr>
            <tr><td>Right</td><td>➡️</td></tr>
            <tr><td>Down</td><td>⬇️</td></tr>
            <tr><td>L Rotate</td><td>A</td></tr>
            <tr><td>R Rotate</td><td>S</td></tr>
          </tbody>
        </table>
      </Controls>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'space-around';
  align-items: stretch;
`;

const PieceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${(props) => {
    if (props.size === 12) return '75px';
    if (props.size === 16) return '100px';
  }};
  height: 100px;
  margin: 10px auto;
  padding: 10px;
`;

const Controls = styled.div`
  background-color: #666;
  text-align: center;
  width: 100%;
  padding: 4px 2px;
  h3 {
    font-size: 14px;
    font-weight: normal;
    margin: 3px auto 5px auto;
  };
  table, td, tr {
    margin: 0px;
    border: 0px;
    padding: 0px;
    font-size: 12px;
    color: white;
  };
  td{
    padding: 2px 11px;
  };
`;

const Text = styled.div`
  margin: 5px auto;
  background-color: #666;
  text-align: center;
  width: 100%;
  padding: 4px 2px;
`;

const Data = styled.div`
  margin: 15px auto;
  text-align: center;
  color: #eee;
`;

const Piece = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${props => props.color};
  box-shadow: inset 1px 1px 2px -1px
`;

const Blank = styled.div`
  width: 25px;
  height: 25px;
`;

export default Stats;