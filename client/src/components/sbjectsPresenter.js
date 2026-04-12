"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SectionalLoader } from "./loader.js";
import Marquee from "react-fast-marquee";

export function ExploreSubjectsPresenter({theme}) {
  let [roadmaps, setRoadmaps] = useState([
    { name: "", description: "", subjects: [{ name: "" }], createdAt: "", imageUrl: "/mainBgBlackImageOne.png", likesCount: 0 },
  ]);

  async function getAllRoadmaps() {
    const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const pr = await un.json();
    const popularSubjects = pr.body.sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
    if (pr.status) {
      setRoadmaps(popularSubjects);
    } else {
      console.log("Failed to fetch roadmaps");
    }
  }

  useEffect(() => {
    getAllRoadmaps();
  }, []);

  const duplicatedRoadmaps = [...roadmaps, ...roadmaps];

  return roadmaps[0].name.length > 0 ? (
    <Marquee speed={40} pauseOnHover={true} gradient={false}>
      <ul className="sliding-ul flex gap-4 w-full justify-start py-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {duplicatedRoadmaps.map((roadmap, index) => (
          <Link href={"/auth/signin"} key={index} className="w-[80vw] sm:w-[320px] md:w-[350px] flex-shrink-0 flex flex-col text-white bg-green-800 px-4 py-3 rounded-sm border-2 border-transparent hover:scale-[1.03] transition-transform cursor-pointer">
            <div className="w-full flex items-center justify-between pb-4 gap-2">
              <h2 className="text-lg font-bold underline line-clamp-1">{roadmap.name}</h2>
              <span className="text-sm text-green-800 border-2 bg-amber-50 px-2 py-1 rounded-2xl whitespace-nowrap flex-shrink-0">
                ❤︎ {roadmap.likesCount}
              </span>
            </div>
            <img
              src={roadmap.imageUrl}
              className="w-full h-28 object-contain my-4 py-3 bg-amber-50 border-2 border-green-800 rounded"
            />
            <p className="w-full text-wrap text-sm line-clamp-3">{roadmap.description}</p>
          </Link>
        ))}
      </ul>
    </Marquee>
  ) : (
    <SectionalLoader theme={theme}/>
  );
}

export function NormalSubjectsPresenter() {
  let [roadmaps, setRoadmaps] = useState([
    { name: "", description: "", subjects: [], createdAt: "", imageUrl: "/mainBgBlackImageOne.png" },
  ]);

  async function getAllRoadmaps() {
    const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const pr = await un.json();
    if (pr.status) {
      setRoadmaps(pr.body);
    } else {
      console.log("Failed to fetch roadmaps");
    }
  }

  useEffect(() => {
    getAllRoadmaps();
  }, []);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full py-5">
      {roadmaps.map((roadmap, index) => (
        <Link href={"/roadmap/" + roadmap._id} key={index} className="flex flex-col w-full text-white bg-green-800 px-4 py-3 rounded-[4px] border border-transparent hover:border-green-800 hover:bg-amber-50 hover:text-green-800 transition-colors cursor-pointer">
          <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold underline line-clamp-1">{roadmap.name}</h2>
            <span className="text-sm text-amber-50 flex-shrink-0">❤︎ {roadmap.likesCount}</span>
          </div>
          <img src={roadmap.imageUrl} className="w-full h-40 object-cover my-2 rounded" />
          <p className="w-full text-wrap text-sm line-clamp-3">{roadmap.description}</p>
        </Link>
      ))}
    </ul>
  );
}