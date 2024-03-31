const db = require("../models");
const Tournament = db.tournament;
const getWinner = require('../utils')
const ObjectId = require('mongodb').ObjectId

const getTournaments = async (req, res) => {
  try {
    const data = await Tournament.find()
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    if (!data.tournament_name) {
      return res.status(400).json({ message: "Tournament name is required" });
    }
    if (!data.creator_name) {
      return res.status(400).json({ message: "Creator Name is required" });
    }
    const tournaments = new Tournament({
      tournament_name: data.tournament_name,
      creator_name: data.creator_name
    })
    await tournaments.save()
    return res.status(200).json({ message: "Tournament created successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getTournament = async (req, res) => {
  try {
    const data = await Tournament.findById(req.params.id)
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const deleteTournament = async (req, res) => {
  try {
    await Tournament.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateTournament = async (req, res) => {
  try {
    const data = req.body
    await Tournament.findByIdAndUpdate(req.params.id, data)
    return res.status(200).json({ message: "Tournament updated successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const createRooms = async (req, res) => {
  try {
    const data = req.body;
    data.players = [];
    const checkrooms = await Tournament.findById(req.params.id)
    if (checkrooms.rooms.filter(item => item.room_id == data.room_id).length >0) {
      return res.status(404).json({message: "Tournament already found"})
    }
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $push: { rooms: data } },
      { new: true } // To return the updated document
    );

    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    return res.status(200).json({ message: "Rooms created successfully", tournament: updatedTournament });
  } catch (error) {
    console.error("Error creating rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getRooms = async (req, res) => {
  try {
    const data = await Tournament.findById(req.params.id)
    return res.status(200).json(data.rooms);
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const deleteRoom = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
    tournament.rooms = tournament.rooms.filter(room => room.room_id != req.body.room_id)
    await tournament.save()
    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const getTournamentPlayers = async (req, res) => {
  try {
    const data = await Tournament.findById(req.params.id)
    const rooms = data.rooms
    const players = rooms.flatMap(room => room.players)
    return res.status(200).json(players);
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const addPlayer = async (req, res) => {
  try {
    const data = req.body;
    const updatedTournament = await Tournament.findById(
      req.params.id
    );
    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament or Room not found" });
    }
    updatedTournament.rooms.filter(room => room.room_id == data.room_id && room.players.push(data.player))
    await updatedTournament.save()
    if (updatedTournament.rooms.length > 0) {
      const winner = await getWinner.getWinner(updatedTournament.rooms);
      await Tournament.findByIdAndUpdate(req.params.id, {
        $set: { "winner_name": winner }
      });
    }
    console.log("Player added")
    return res.status(200).json({ message: "Player added successfully" });
  } catch (error) {
    console.error("Error adding player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const editPlayer = async (req, res) => {
  try {
    const data = req.body
    const tournaments = await Tournament.findById(
      req.params.id
    );
    tournaments.rooms.filter(room => room.room_id == data.room_id && room.players.filter(player => player.player_name == data.player_name && (player.score = data.score)))
    await tournaments.save()
    const winner = await getWinner.getWinner(tournaments.rooms)
    await Tournament.findByIdAndUpdate(req.params.id, {
      $set: { "winner_name": winner }
    })
    return res.status(200).json({ message: "Player edited successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const deletePlayer = async (req, res) => {
  try {
    const data = req.body;
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    const roomIndex = tournament.rooms.findIndex(room => room.room_id == data.room_id);

    if (roomIndex === -1) {
      return res.status(404).json({ message: "Room not found" });
    }
    tournament.rooms[roomIndex].players = tournament.rooms[roomIndex].players.filter(player => player.player_name !== data.player_name);
    await tournament.save();
    const winner = await getWinner.getWinner(tournament.rooms);
    await Tournament.findByIdAndUpdate(req.params.id, {
      $set: { "winner_name": winner }
    });
    return res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  create,
  getTournaments,
  getTournament,
  deleteTournament,
  updateTournament,
  createRooms,
  getRooms,
  deleteRoom,
  getTournamentPlayers,
  addPlayer,
  editPlayer,
  deletePlayer
}
