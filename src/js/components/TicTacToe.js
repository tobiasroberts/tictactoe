import React from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/';
import Controls from '../containers/controls';
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
      this.props.add({
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
        <Controls />
      </div>
    );
  }
}

const getResult = (literals, ...expressions) => `${(expressions[0]) ? 'Winner: ' + ((expressions[1]) ? 'O' : 'X') : 'Draw'}`;

const mapDispatchToProps = {
  add
};
  
export default connect(state => state, mapDispatchToProps)(TicTacToe);