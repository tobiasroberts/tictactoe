import React from 'react';
import { connect } from 'react-redux';
import { move } from '../actions/';
import '../../sass/main.scss';

const getResult = (literals, ...expressions) => `${(expressions[0]) ? 'Winner: ' + ((expressions[1]) ? 'O' : 'X') : 'Draw'}`;
  
const Square = props => (
    <button className="square" onClick={props.onClick}>
      <div className={props.strikeout}>
        <div className="reset">
          {props.value}
        </div>
      </div>
    </button>
);
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          strikeout={this.props.result && this.props.result.squares.includes(i) ? this.props.result.strikeout : ''}
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
    if ((this.props.present.squares[i] === null) && ((this.props.present.squares.includes(null)) && (this.props.present.result === null))) {
      this.props.move({
        square: i,
        squares: this.props.present.squares,
        xIsNext: this.props.present.xIsNext
      });
    }
  }
  
  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
              squares={this.props.present.squares}
              onClick={(i) => this.handleClick(i)}
              result={this.props.present.result}
          />
        </div>
        <div className="result">
          <span>{this.props.present.result && getResult`${this.props.present.result.strikeout}${this.props.present.xIsNext}`}</span>
        </div>
      </div>
    );
  }
}

export default connect(state => state, { move })(TicTacToe);