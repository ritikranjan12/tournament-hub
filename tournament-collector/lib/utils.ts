import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Room {
  room_id: string;
  players: Player[];
}

export interface Player {
  player_name: string;
  score: number;
  _id: string;
}

export interface Tournament {
  tournament_name: string;
  creator_name: string;
  winner_name: string;
  rooms: Room[];
  id: string;
}

export const findLength = (rooms : any, room_id:any) => {
  let res = 0
  res = rooms.find((room : any) => room.room_id == room_id).players.length
  return res
}