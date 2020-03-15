import { ADD_MOVE } from "../constants/action-types";

const initialState = {
    moves: [{
        squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
};
  
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
            xIsNext: !payload.move.xIsNext
        };
    }
    return state;
}

export default rootReducer;
