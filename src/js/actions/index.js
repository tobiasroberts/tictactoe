import { MOVE } from "../constants/action-types";

export function move(move) {
  return { type: MOVE, move };
}
