import { ADD } from "../constants/action-types";

export function add(move) {
  return { type: ADD, move };
}
