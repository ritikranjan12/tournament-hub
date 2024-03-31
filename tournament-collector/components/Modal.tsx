import React from "react";
import { Button } from "./ui/button";
import Fireworks from "./Fireworks";

export default function Modal({ isOpen, onClose, winner_name }  : {isOpen: boolean, onClose: any, winner_name: string}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-md z-50">
        <span className="absolute top-0 right-0 m-4 text-gray-500 cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4">{winner_name ? (
          "Winner - " + winner_name
        ) : "No winner Found"}</h2>
        <Button  className="outline text-center" onClick={onClose}>Close</Button>
      </div>
      <Fireworks />
    </div>
  );
}