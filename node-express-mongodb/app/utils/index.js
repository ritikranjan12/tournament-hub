async function getWinner(rooms) {
    let winner = null
    let score = 0
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const players = room.players
        for (let j = 0; j < players.length; j++) {
            const player = players[j];
            if (player.score > score) {
                score = player.score
                winner = player.player_name
            }
        }
    }
  return winner
}

module.exports = { getWinner }


