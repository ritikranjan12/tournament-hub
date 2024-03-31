"use client"
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Tournament } from "@/lib/utils";
import TournamentTable from "@/components/Tournament-Table";
import { Button } from '@/components/ui/button';
import { TournamentForm } from "@/components/TournamentForm";
import Image from 'next/image';

export default function Home() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const getTournaments = async () => {
    const response = await fetch("http://localhost:8080/api/tournaments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    getTournaments().then(data => {
      setTournaments(data);
    });
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="max-w-5xl w-full text-center">
        <p className="border-b border-gray-300 bg-zinc-200 pb-2 pt-4 backdrop-blur-2xl rounded-xl dark:border-neutral-800 dark:bg-zinc-800/30">
          {tournaments.length} Tournaments Live Now &nbsp;<span>--&gt;</span>
        </p>
      </div>
      <div className="flex justify-center w-full mt-4 md:mt-8">
        {tournaments.length === 0 ? "" : (
          <Carousel>
            <CarouselContent>
              {tournaments.map((tournament) => (
                <CarouselItem key={tournament.id} className="w-64 mx-4">
                  <Link href={`/tournaments/${tournament.id}`}>
                    <div className="flex flex-col items-center">
                      <Image src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600" alt={tournament.tournament_name} width={500} height={300} className="object-cover rounded-lg" />
                      <p className="text-lg text-white font-semibold mt-2">{tournament.tournament_name}</p>
                      <p className="text-gray-500">{tournament.creator_name}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
      {tournaments.length > 0 && <TournamentTable tournaments={tournaments} />}
      <Button className='mt-6' onClick={handleShowForm}>Start your Tournament</Button>
      {showForm && <TournamentForm />} 
    </main>
  );
}
