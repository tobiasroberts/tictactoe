import { ADD_MOVE } from "../constants/action-types";

export function addMove(move) {
  return { type: ADD_MOVE, move };
}
