import Link from "next/link";

const TournamentTable = ({ tournaments }: any) => {
    const getTotalPlayers = (rooms: any) => {
      let totalPlayers = 0;
      rooms?.forEach((room: any) => {
        totalPlayers += room?.players.length;
      });
      return totalPlayers;
    };
  
    return (
      <div className="overflow-x-auto mt-8 mb-8">
        <div className="hidden md:block"> {/* Hide the table on small devices */}
          <table className="w-full border-collapse shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-400 text-left text-white">Tournament Name</th>
                <th className="px-4 py-2 border-b border-gray-400 text-left text-white">Number of Rooms</th>
                <th className="px-4 py-2 border-b border-gray-400 text-left text-white">Total Players</th>
                <th className="px-4 py-2 border-b border-gray-400 text-left text-white">Winner Name</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament: any, index: number) => (
                <tr key={index} className="border-b"> 
                  <Link href={`/tournaments/${tournament.id}`}>
                  <td className="px-4 py-2  border-gray-400 text-white">{tournament.tournament_name}</td>
                  </Link>
                  <td className="px-4 py-2  border-gray-400 text-white">{tournament.rooms.length}</td>
                  <td className="px-4 py-2  border-gray-400 text-white">{getTotalPlayers(tournament.rooms)}</td>
                  <td className="px-4 py-2  border-gray-400 text-white">{tournament.winner_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden">
          {tournaments.map((tournament: any, index: number) => (

            <div key={index} className="border-b border-gray-400 py-2 border-2 mt-2 mb-2 p-2">
              <Link href={`/tournaments/${tournament.id}`}>
              <p className="text-white">Tournament Name: {tournament.tournament_name}</p> 
              </Link>
              <p className="text-white">Number of Rooms: {tournament.rooms.length}</p>
              <p className="text-white">Total Players: {getTotalPlayers(tournament.rooms)}</p>
              <p className="text-white">Winner Name: {tournament.winner_name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TournamentTable;
  