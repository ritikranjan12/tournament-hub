"use client"
import Modal from "@/components/Modal"
import { useToast } from "@/components/ui/use-toast"
import { Tournament, findLength } from "@/lib/utils"
import { useLayoutEffect, useState } from "react"
import React from "react"


export default function Page({
  params
}: {
  params: { slug: string }
}) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [newRoomName, setNewRoomName] = useState<string>("")
  const [newPlayerName, setNewPlayerName] = useState<string>("")
  const [newPlayerScore, setNewPlayerScore] = useState<number>(0)
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [editRoomId, setEditRoomId] = useState<string>("")
  const [addRoomId, setAddRoomId] = useState<string>("")
  const [editPlayerScore, setEditPlayerScore] = useState<number>(0)
  const { toast } = useToast()
  useLayoutEffect(() => {
    const fetchTournament = async () => {try {
        const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}`)
        const data = await response.json()
        setTournament(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTournament()
  }, [params.slug, tournament?.rooms.length, tournament, newRoomName, newPlayerName, newPlayerScore])

  const handleAddRoom = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_id: newRoomName
        })
      })
      const data = await response.json()
      toast({
        title: "Room Added",
        description: `Room ${newRoomName} has been added to the tournament`,
      })
      setNewRoomName("")
    } catch (error) {
      console.error(error)
      toast({
        title: "Room Added",
        description: `Room ${newRoomName} has not been added to the tournament`,
      })
    }
  }


  const handleDeleteRoom = async (roomId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}/rooms`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_id: roomId
        })
      })
      const data = await response.json()
      toast({
        title: "Room Deleted",
        description: `Room ${roomId} has been deleted from the tournament`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Room Deleted",
        description: `Room ${roomId} has not been deleted from the tournament`,
      })
    }
  }


  const handleEditPlayerClick = (player: any) => {
    setEditingPlayer(player);
  };

  const handleEditPlayer = (roomId: string, playerId: string) => {
    setEditRoomId(roomId);
    handleEditPlayerClick(playerId);
  };

  const handleAddPlayer = async (roomId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}/room-players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_id: roomId,
          player: {
            player_name: newPlayerName,
            score: newPlayerScore
          }
        })
      })
      const data = await response.json()
      toast({
        title: "Player Added",
        description: `Player ${newPlayerName} has been added to the room`,
      })
      setNewPlayerName("")
      setNewPlayerScore(0)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error Adding Player",
        description: `Player ${newPlayerName} could not be added to the room`,
      })
    }
  }
  
  const handleEditPlayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}/room-players`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_id: editRoomId,
          player_name: editingPlayer,
          score: editPlayerScore
        })
      });
      const data = await response.json();
      toast({
        title: "Player Updated",
        description: `Player ${editingPlayer} has been updated successfully`
      });
      setEditingPlayer(null);
      setNewPlayerScore(0);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Updating Player",
        description: `An error occurred while updating the player`
      });
    }
  };
  

  const handleDeletePlayer = async(roomId: string, playerId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}/room-players`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          room_id: roomId,
          player_name: playerId
        })
      })
      const data = await response.json()
      toast({
        title: "Room Deleted",
        description: `Room ${roomId} has been deleted from the tournament`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Room Deleted",
        description: `Room ${roomId} has not been deleted from the tournament`,
      })
    }
  }

  const handleDeleteTournament = async() => {
    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${params.slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [showModal, setShowModal] = useState(false);
  
  const handleShowWinner = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
    // Stop fireworks animation
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {tournament ? (
        <div className="w-full max-w-4xl p-8 bg-white rounded-lgshadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-center mb-4 md:mb-8">{tournament.tournament_name} </h1>
                <span className="text-lg font-medium text-center mb-8">By {tournament.creator_name}</span>
                <div className="flex justify-center mb-4">
            <button onClick={handleDeleteTournament} className="bg-red-500 mx-2 text-white px-4 py-2 rounded-md">Delete Tournament</button>
            <button onClick={handleShowWinner} className="bg-blue-500 text-white px-4 py-2 rounded-md">Show Winner</button>
          </div>
          <div className="flex justify-center">
          </div> 
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-8">
                <h2 className="text-2xl font-bold mb-4">Rooms</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddRoom() }} className="mb-4">
                  <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Enter Room Name" className="mr-2 px-4 py-2 mb-2 border border-gray-300 rounded-md w-full md:w-1/2" />
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Add Room</button>
                </form>
                {tournament.rooms.length > 0 ? (<table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Room Name</th>
                      <th className="px-4 py-2">Capacity</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournament.rooms.map((room, index) => (
                      <>
                        <tr key={index}>
                          <td className="px-4 py-2">{room.room_id}</td>
                          <td className="px-4 py-2">{findLength(tournament.rooms, room.room_id)}</td>
                          <td className="px-4 py-2">
                            <button onClick={() => handleDeleteRoom(room.room_id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>) : <p>No rooms available</p>}
              </div>
            </div>
            <div className="md:w-1/2">
              {tournament.rooms.map((room, roomIndex) => (
                <div key={roomIndex} className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Room: {room?.room_id}</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2">{editingPlayer && room.room_id == editRoomId ? "Edit Player" : "Add Player" }</h4>
                    <form onSubmit={(e) => editingPlayer ? handleEditPlayerSubmit(e) : handleAddPlayer(room.room_id,e)} className="mb-2">
                      <input type="text" value={editingPlayer && room.room_id == editRoomId ? editingPlayer : addRoomId == room.room_id ? newPlayerName : ""} onChange={(e) => {setNewPlayerName(e.target.value)
                         setAddRoomId(room?.room_id)}} placeholder="Enter Player Name" className=" mb-2 mr-2 px-4 py-2 border border-gray-300 rounded-md w-full" />
                      <input type="number" value={editingPlayer && room.room_id == editRoomId ? editPlayerScore : addRoomId == room.room_id ? newPlayerScore: 0} onChange={(e) => editingPlayer && room.room_id == editRoomId ? setEditPlayerScore(parseInt(e.target.value)) :setNewPlayerScore(parseInt(e.target.value))} placeholder="Enter Player Score" className=" mb-2 mr-2 px-4 py-2 border border-gray-300 rounded-md w-full" />
                      <button type="submit" className="bg-green-500 text-white px-4 py-2 mb-2 rounded-md">{editingPlayer && room.room_id == editRoomId ? "Update Player" : "Add Player"}</button>
                    </form>
                    {room.players.map((player, playerIndex) => (
                      <div key={playerIndex} className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold">{player.player_name}</h4>
                          <p className="text-gray-600">{player.score}</p>
                        </div>
                        <div>
                          <button onClick={() => handleEditPlayer(room.room_id, player.player_name)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                          <button onClick={() => handleDeletePlayer(room.room_id, player.player_name)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              ))}
            </div>
          </div>
          <Modal isOpen={showModal} onClose={handleCloseModal} winner_name={tournament.winner_name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )}