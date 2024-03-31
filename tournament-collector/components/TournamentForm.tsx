import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export const TournamentForm = () => {
    const [tournamentName, setTournamentName] = useState<string>('')
    const [creatorName, setCreatorName] = useState<string>('')
    const { toast } = useToast()
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/tournaments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tournament_name: tournamentName,
                    creator_name: creatorName
                })
            });
            const data = await response.json();
            toast({
                description: "Tournament added successfully.",
              })
        } catch (error : any) {
            toast({
                title: 'Error',
                description: 'Tournament could not be added. Please try again later.'
            })
        }
    }
    return(
        <main>
            <form className="flex flex-col justify-center items-center min-h-screen p-4 -mt-16">
                <div className="max-w-5xl w-full text-center">
                    <p className="border-b border-gray-300 bg-zinc-200 pb-2 pt-4 backdrop-blur-2xl rounded-xl dark:border-neutral-800 dark:bg-zinc-800/30">
                        Add Tournament
                    </p>
                </div>
                <div className="flex justify-center w-full mt-4 md:mt-8">
                    <div className="flex flex-col items-center justify-center h-full bg-gray-200 rounded-xl shadow-lg p-4">
                        <label className="text-xl font-bold">Tournament Name</label>
                        <input onChange={(e) => setTournamentName(e.target.value)} type="text" className="border border-gray-300 rounded-md p-2 w-96" placeholder="Tournament Name" />
                        <label className="text-xl font-bold mt-4">Creator Name</label>
                        <input onChange={(e) => setCreatorName(e.target.value)} type="text" className="border border-gray-300 rounded-md p-2 w-96" placeholder="Creator Name" />
                        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md mt-4">Add Tournament</button>
                    </div>
                </div>
            </form>
        </main>
    )
}