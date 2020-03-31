import { ADD_MOVE } from "../constants/action-types";

const initialState = {
    moves: [{
        squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    strikethrough: null
};

const strikethroughs = [
    {combination: [0, 1, 2], type: 'horizontal'},
    {combination: [3, 4, 5], type: 'horizontal'},
    {combination: [6, 7, 8], type: 'horizontal'},
    {combination: [0, 3, 6], type: 'vertical'},
    {combination: [1, 4, 7], type: 'vertical'},
    {combination: [2, 5, 8], type: 'vertical'},
    {combination: [0, 4, 8], type: 'diagional-left'},
    {combination: [2, 4, 6], type: 'diagional-right'}
];
  
const strikeout = squares => {
    for (let i = 0; i < strikethroughs.length; i++) {
        if (strikethroughs[i].combination.map(j => squares[j]).every((thing, k, squares) => thing && thing === squares[0])) {
            return strikethroughs[i];
        }
    }
    return null;
}

function rootReducer(state = initialState, payload) {
    if (payload.type === ADD_MOVE) {
        const moves = payload.move.moves.slice(0, payload.move.stepNumber + 1);
        const squares = moves[moves.length - 1].squares.slice();
        squares[payload.move.square] = payload.move.xIsNext ? 'X' : 'O';
        state = {
            moves: moves.concat([{
                squares: squares,
                row: parseInt(payload.move.square/3) + 1,
                column: payload.move.square%3 + 1
            }]),
            stepNumber: payload.move.moves.length,
            xIsNext: !payload.move.xIsNext,
            strikethrough: strikeout(squares)
        };
    }
    return state;
}
  
export default rootReducer;
