import React from 'react';
import { connect } from 'react-redux';
import { addMove } from '../actions/';
import '../../sass/main.scss';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <div className={props.strikeout}>
        <div className="reset">
          {props.value}
        </div>
      </div>
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          strikeout={this.props.strikethrough && this.props.strikethrough.combination.includes(i) ? this.props.strikethrough.type : ''}
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
    if ((this.props.moves[this.props.moves.length - 1].squares[i] === null) && ((this.props.moves[this.props.moves.length - 1].squares.includes(null)) && (this.props.strikethrough === null))) {
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
              strikethrough={this.props.strikethrough}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addMove
};
  
export default connect(state => state, mapDispatchToProps)(TicTacToe);