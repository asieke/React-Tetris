import React from 'react';
import styled from 'styled-components';

const bgs = ['rgba(0,0,0,0.0)', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6'];

const piecePreviews = [
  null,
  [1, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 0]
];

let Stats = ({ lines, next, speed }) => {

  let preview = piecePreviews[next.id];
  // let preview = piecePreviews[4];

  return (
    <div>
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
      <Text>Speed</Text>
      <Data>{speed}</Data>
    </div>
  );
};

const PieceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${(props) => {
    if (props.size === 9) return '75px';
    if (props.size === 16) return '100px';
  }};
  height: ${(props) => {
    if (props.size === 9) return '75px';
    if (props.size === 16) return '100px';
  }};
  margin: 10px auto;
  padding: 10px;
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