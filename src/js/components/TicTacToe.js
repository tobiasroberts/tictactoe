import React from 'react';
import { connect } from 'react-redux';
import { addMove, reset } from '../actions/';
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
    if ((this.props.moves[this.props.moves.length - 1].squares[i] === null) && ((this.props.moves[this.props.moves.length - 1].squares.includes(null)) && (this.props.result === null))) {
      this.props.addMove({
        square: i,
        moves: this.props.moves,
        stepNumber: this.props.stepNumber,
        xIsNext: this.props.xIsNext
      });
    }
  }
  
  handleControls(control) {
    switch (control){
      case 'reset':
        this.props.reset();
        break;
      default:
        console.log('Not yet implemented');
    }
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
              squares={this.props.moves[this.props.stepNumber].squares}
              onClick={(i) => this.handleClick(i)}
              result={this.props.result}
          />
        </div>
        <div className="result">
          <span>{this.props.result && getResult`${this.props.result.strikeout}${this.props.xIsNext}`}</span>
        </div>
        <div className="controls">
          <span className="previous" onClick={() => this.handleControls('previous')}></span>
          <span className="reset" onClick={() => this.handleControls('reset')}></span>
          <span className="next" onClick={() => this.handleControls('next')}></span>
        </div>
      </div>
    );
  }
}

const getResult = (literals, ...expressions) => `${(expressions[0]) ? 'Winner: ' + ((expressions[1]) ? 'O' : 'X') : 'Draw'}`;

const mapDispatchToProps = {
  addMove,
  reset
};
  
export default connect(state => state, mapDispatchToProps)(TicTacToe);