import { ADD_MOVE, RESET } from "../constants/action-types";

export function addMove(move) {
  return { type: ADD_MOVE, move };
}

export function reset() {
  return { type: RESET };
}
