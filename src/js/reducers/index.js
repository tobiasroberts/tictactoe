import { MOVE } from "../constants/action-types";

const initialState = {
    squares: Array(9).fill(null),
    xIsNext: true,
    result: null
};

const permutations = [
    {squares: [], strikeout: ''},
    {squares: [[0, 1, 2],[3, 4, 5],[6, 7, 8]], strikeout: 'horizontal'},
    {squares: [[0, 3, 6],[1, 4, 7],[2, 5, 8]], strikeout: 'vertical'},
    {squares: [[0, 4, 8],[2, 4, 6]], strikeout: 'diagional'}
];

const checkPermutations = squares => {
    for (let i = 1; i < permutations.length; i++) {
        for (let j = 0; j < permutations[i].squares.length; j++) {
            if (permutations[i].squares[j].map(k => squares[k]).every((thing, l, squares) => thing && thing === squares[0])) {
                return {squares: permutations[i].squares[j], strikeout: permutations[i].strikeout  + ((i === 3) ? ((j === 0) ? '-left' : '-right') : '') };
            }
        }
    }
    return squares.includes(null) ? null : permutations[0];
}

function rootReducer(state = initialState, payload) {
    switch (payload.type) {
        case MOVE:
            const squares = [...payload.move.squares];
            squares[payload.move.square] = payload.move.xIsNext ? 'X' : 'O';
            state = {
                squares: squares,
                xIsNext: !payload.move.xIsNext,
                result: checkPermutations(squares)
            };
            break;
        default:
            state = initialState;
    }
    return state;
}
  
export default rootReducer;
