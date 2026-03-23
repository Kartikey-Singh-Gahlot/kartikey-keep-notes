"use clent";
import Link from "next/link";
import { useState, useEffect } from "react";

export function ExploreSubjectsPresenter(){
    let [subjects, setSubjects] = useState([{name:"", description:"", chapters:[], createdAt:"", imageUrl:"/mainBgBlackImageOne.png", likesCount:0}]);
    async function getAllSubjects(){
      const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await un.json();
      const popularSubjects = pr.body.sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
      if(pr.status){
        setSubjects(popularSubjects);
      } else {
        console.log("Failed to fetch subjects");
      }     
    }

    useEffect(()=>{
      getAllSubjects(); 
    },[]);

    return(
          <ul className="flex gap-5 w-full justify-start py-5 overflow-x-scroll scroll-smooth scroll-hidden max-w-[98vw] ">
            {
              subjects.map((subject, index)=>{
                  return(          
                      <Link href={'/auth/signin'} key={index} className={`min-w-[350px] max-w-[400px]  flex flex-col w-full transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer`}>
                                 <div className="w-full flex items-center justify-between pb-5">
                                        <h2 className="text-xl font-bold underline">{subject.name}</h2>
                                        <h2 className="text-sm text-amber-50">Likes :{subject.likesCount}</h2>
                                  </div>
                                  <img src={subject.imageUrl} className="w-full  object-cover my-2 rounded"/>
                                  <p className="w-full text-wrap">
                                     {subject.description}
                                  </p>
                      </Link>
                  )
              })
            }
          </ul>
    )
}

export function NormalSubjectsPresenter(){
    let [subjects, setSubjects] = useState([{name:"", description:"", chapters:[], createdAt:"", imageUrl:"/mainBgBlackImageOne.png"}]);     
    async function getAllSubjects(){
      const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await un.json();   
        if(pr.status){  
            setSubjects(pr.body);
            
        } else {
            console.log("Failed to fetch subjects");        
        }
    }

    useEffect(()=>{
      getAllSubjects(); 
    },[]);  

    return( 
            <ul className="flex gap-5 w-full flex-wrap justify-start py-5">
            {   
                subjects.map((subject, index)=>{    
                    return(
                        <Link href={'/subject/' + subject._id} key={index} className={`min-w-[280px] max-w-[400px] flex flex-col w-full transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer`}> 
                                    <div className="w-full flex items-center justify-between">
                                        <h2 className="text-xl font-bold underline">{subject.name}</h2>
                                        <h2 className="text-sm text-amber-50">Likes :{subject.likesCount}</h2>
                                    </div>  
                                  <img src={subject.imageUrl} className="w-full h-40 object-cover my-2 rounded"/>
                                    <p className="w-full text-wrap">
                                     {subject.description}
                                    </p>
                        </Link>
                    )
                })
             }
            </ul>
    ) 
}   