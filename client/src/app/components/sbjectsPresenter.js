"use clent";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./components.css";

export function ExploreSubjectsPresenter(){
    let [roadmaps, setRoadmaps] = useState([{name:"", description:"", subjects:[{name:""}], createdAt:"", imageUrl:"/mainBgBlackImageOne.png", likesCount:0}]);
    async function getAllRoadmaps(){
      const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await un.json();
      const popularSubjects = pr.body.sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
      if(pr.status){
        setRoadmaps(popularSubjects);
      } else {
        console.log("Failed to fetch roadmaps");
      }     
    }

    useEffect(()=>{
      getAllRoadmaps(); 
    },[]);

    const duplicatedRoadmaps = [...roadmaps, ...roadmaps];

    return(
          <ul className="sliding-ul flex gap-5 w-full justify-start py-5 overflow-x-scroll scroll-smooth scroll-hidden max-w-[98vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {
              duplicatedRoadmaps.map((roadmap, index)=>{
                  return(          
                      <Link href={'/auth/signin'} key={index} className={`min-w-[350px] max-w-[400px]  flex flex-col w-full transition-colors text-nowrap px-4 py-2 mx-5 rounded-sm  text-white  border-2 border-[#ffffff00] hover:scale-103 transition-transform  bg-green-800  cursor-pointer hover`}>
                                 <div className="w-full flex items-center justify-between pb-5">
                                        <h2 className="text-xl font-bold underline">{roadmap.name}</h2>
                                        <h2 className="text-sm text-green-800 border-2 bg-amber-50  px-2 py-1 rounded-2xl"> ❤︎⁠ {roadmap.likesCount}</h2>
                                  </div>
                                  <img src={roadmap.imageUrl} className="w-full h-30 object-contain my-5 py-3 bg-amber-50 border-2 border-green-800  rounded"/>
                                  <p className="w-full text-wrap">
                                     {roadmap.description}
                                  </p>
                      </Link>
                  )
              })
            }
          </ul>
    )
}

export function NormalSubjectsPresenter(){
    let [roadmaps, setRoadmaps] = useState([{name:"", description:"", subjects:[], createdAt:"", imageUrl:"/mainBgBlackImageOne.png"}]);     
    async function getAllRoadmaps(){
      const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await un.json();   
        if(pr.status){  
            setRoadmaps(pr.body);
            
        } else {
            console.log("Failed to fetch roadmaps");        
        }
    }

    useEffect(()=>{
      getAllRoadmaps(); 
    },[]);  

    return( 
            <ul className="flex gap-5 w-full flex-wrap justify-start py-5">
            {   
                roadmaps.map((roadmap, index)=>{    
                    return(
                        <Link href={'/roadmap/' + roadmap._id} key={index} className={`min-w-[280px] max-w-[400px] flex flex-col w-full transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer`}> 
                                    <div className="w-full flex items-center justify-between">
                                        <h2 className="text-xl font-bold underline">{roadmap.name}</h2>
                                        <h2 className="text-sm text-amber-50">Likes :{roadmap.likesCount}</h2>
                                    </div>  
                                  <img src={roadmap.imageUrl} className="w-full h-40 object-cover my-2 rounded"/>
                                    <p className="w-full text-wrap">
                                     {roadmap.description}
                                    </p>
                        </Link>
                    )
                })
             }
            </ul>
    ) 
}   