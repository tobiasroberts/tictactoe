import { ADD } from "../constants/action-types";

export function move(move) {
  return { type: ADD, move };
}
