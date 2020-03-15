import React from 'react';
import { connect } from 'react-redux';
import { addMove } from '../actions/';
import '../../sass/main.scss';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  handleClick(i) {
    if (this.props.moves[this.props.moves.length - 1].squares.includes(null)) {
      this.props.addMove({
        square: i,
        moves: this.props.moves,
        stepNumber: this.props.stepNumber,
        xIsNext: this.props.xIsNext
      });
    }
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
              squares={this.props.moves[this.props.stepNumber].squares}
              onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }

}

const determineWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

  
const mapDispatchToProps = {
  addMove
};
  
export default connect(state => state, mapDispatchToProps)(TicTacToe);