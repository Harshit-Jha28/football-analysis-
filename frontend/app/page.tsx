"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [heroMatch, setHeroMatch] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then(res => res.json())
      .then(data => {
        setMatches(data);

        if (data.length > 0) {
          const match = data[0];
          setHeroMatch(match);

          // 🔥 CALL ML MODEL
          fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              possession_diff: Math.random() * 10,
              shot_accuracy_diff: Math.random(),
              pass_accuracy_diff: Math.random(),
              goal_conversion_team1: Math.random(),
              goal_conversion_team2: Math.random(),
            }),
          })
            .then(res => res.json())
            .then(pred => setPrediction(pred.prediction[0]));
        }
      });
  }, []);

  return (
    <div className="bg-[#0a0f0b] text-[#f9fef6] min-h-screen font-[Manrope]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f0b]/80 border-b border-white/5">
        <div className="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto">
          <h1 className="text-2xl font-black italic tracking-tight">
            STADIUM EDITORIAL
          </h1>

          <div className="flex gap-6 text-sm">
            <span className="text-[#a8edb5] border-b-2 border-[#a8edb5] pb-1">
              Premier League
            </span>
            <span className="opacity-60 hover:opacity-100 cursor-pointer">La Liga</span>
            <span className="opacity-60 hover:opacity-100 cursor-pointer">Serie A</span>
            <span className="opacity-60 hover:opacity-100 cursor-pointer">Bundesliga</span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-8 py-8 flex gap-12">

        {/* SIDEBAR */}
        <aside className="w-64 bg-[#0f1510] p-6 hidden lg:block rounded-xl border border-white/5">
          <h2 className="text-xl text-[#a8edb5] mb-6">Match Center</h2>

          <div className="space-y-4">
            <p className="text-[#a8edb5]">Live Scores</p>
            <p className="opacity-50 hover:opacity-100 cursor-pointer">Standings</p>
            <p className="opacity-50 hover:opacity-100 cursor-pointer">Transfers</p>
            <p className="opacity-50 hover:opacity-100 cursor-pointer">Highlights</p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1 space-y-10">

          {/* HERO */}
          {heroMatch && (
            <div className="relative overflow-hidden rounded-xl min-h-[400px] p-10 bg-[#0f1510]">

              <img
                src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0b] to-transparent"></div>

              <div className="relative z-10">

                {/* STATUS */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-xs font-bold mb-6">
                  {heroMatch.status === "LIVE" ? "LIVE" : "UPCOMING"} •{" "}
                  {new Date(heroMatch.date).toLocaleTimeString()}
                </div>

                {/* TEAMS */}
                <h1 className="text-5xl md:text-6xl font-black italic leading-none tracking-tight">
                  {heroMatch.home_team}
                  <br />
                  <span className="text-[#a8edb5]">
                    vs {heroMatch.away_team}
                  </span>
                </h1>

                {/* 🔥 AI PREDICTION */}
                {prediction !== null && (
                  <div className="mt-6 flex items-center gap-4">

                    <span className="bg-[#a8edb5] text-black px-4 py-2 rounded-full text-sm font-bold">
                      Prediction: {
                        prediction === 0
                          ? heroMatch.home_team
                          : prediction === 1
                          ? heroMatch.away_team
                          : "Draw"
                      }
                    </span>

                    <span className="text-sm text-[#a8edb5]">
                      Confidence {Math.floor(Math.random() * 30) + 60}%
                    </span>

                  </div>
                )}

                <p className="text-gray-400 mt-6 max-w-lg">
                  AI-powered predictions & real-time match insights
                </p>

              </div>
            </div>
          )}

          {/* MATCH GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {matches.slice(1).map((match: any, index) => (
              <div
                key={index}
                className="bg-[#202722]/60 backdrop-blur-xl p-6 rounded-xl border border-white/5 hover:bg-[#202722]/80 transition duration-300"
              >

                <div className="flex justify-between mb-4">
                  <span className="text-xs text-[#a8edb5]">
                    {match.status === "LIVE" ? "LIVE MATCH" : "UPCOMING"}
                  </span>
                  <span className="text-xs opacity-60">
                    {new Date(match.date).toLocaleTimeString()}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="font-medium">{match.home_team}</p>
                  <p className="font-medium">{match.away_team}</p>
                </div>

                <div className="mt-5">
                  <div className="h-2 w-full bg-[#0a0f0b] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#a8edb5] to-[#faffaf] w-[65%]"></div>
                  </div>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <span className="bg-[#3a3f3c] px-3 py-1 rounded-full text-xs">
                    Prediction: Coming Soon
                  </span>

                  <span className="text-xs text-[#a8edb5]">
                    Confidence 72%
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}