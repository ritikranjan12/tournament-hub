module.exports = app => {
  const tournament = require("../controllers/tournament.js");
  const router = require("express").Router();

  const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

  router.route('/')
    .get(asyncHandler(tournament.getTournaments))
    .post(asyncHandler(tournament.create))

  router.route('/:id')
    .get(asyncHandler(tournament.getTournament))
    .patch(asyncHandler(tournament.updateTournament))
    .delete(asyncHandler(tournament.deleteTournament))

  
  router.post('/:id/rooms', asyncHandler(tournament.createRooms))
  router.get('/:id/rooms', asyncHandler(tournament.getRooms))
  router.delete('/:id/rooms', asyncHandler(tournament.deleteRoom))

  router.get('/:id/room-players', asyncHandler(tournament.getTournamentPlayers))

  router.post('/:id/room-players', asyncHandler(tournament.addPlayer))
  router.patch('/:id/room-players', asyncHandler(tournament.editPlayer))
  router.delete('/:id/room-players', asyncHandler(tournament.deletePlayer))


  app.use('/api/tournaments', router);
};