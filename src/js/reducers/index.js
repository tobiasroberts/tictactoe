import { ADD_MOVE } from "../constants/action-types";

const initialState = {
    moves: [{
        squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null
};

const winningCombinations = [
    {combination: [0, 1, 2], strikethrough: 'horizontal-line'},
    {combination: [3, 4, 5], strikethrough: 'horizontal-line'},
    {combination: [6, 7, 8], strikethrough: 'horizontal-line'},
    {combination: [0, 3, 6], strikethrough: 'vertical-line'},
    {combination: [1, 4, 7], strikethrough: 'vertical-line'},
    {combination: [2, 5, 8], strikethrough: 'vertical-line'},
    {combination: [0, 4, 8], strikethrough: 'diagional-line-left'},
    {combination: [2, 4, 6], strikethrough: 'diagional-line-right'}
];
  
function rootReducer(state = initialState, payload) {
    if (payload.type === ADD_MOVE) {
        const moves = payload.move.moves.slice(0, payload.move.stepNumber + 1);
        const current = moves[moves.length - 1];
        const squares = current.squares.slice();
        squares[payload.move.square] = payload.move.xIsNext ? 'X' : 'O';
        state = {
            moves: moves.concat([{
                squares: squares,
                row: parseInt(payload.move.square/3) + 1,
                column: payload.move.square%3 + 1
            }]),
            stepNumber: payload.move.moves.length,
            xIsNext: !payload.move.xIsNext,
            winner: determineWinner(squares)
        };
    }
    return state;
}

const determineWinner = squares => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i].combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return winningCombinations[i];
      }
    }
    return null;
  }
  
export default rootReducer;
