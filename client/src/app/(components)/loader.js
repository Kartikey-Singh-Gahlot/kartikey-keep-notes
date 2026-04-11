import "./components.css";


export  function FullScreenLoader({theme}){
    
    
    return(
      <section className={`h-screen flex justify-center items-center  gap-4`}>
            
              <div className={`animate-spin h-10 w-10 rounded-full border-[6px] border-dotted  ${(theme)?"border-green-800  border-b-transparent border-r-transparent":"border-amber-50 border-b-transparent border-r-transparent"}`}>
              </div>
              <h1 className="text-2xl ">Loading</h1>
            
      </section>  
    )
}

export  function SectionalLoader({theme}){
    
    
    return(
      <section className={`h-full flex justify-center items-center  gap-4`}>
            
              <div className={`animate-spin h-10 w-10 rounded-full border-[6px] border-dotted  ${(theme)?"border-green-800  border-b-transparent border-r-transparent":"border-amber-50 border-b-transparent border-r-transparent"}`}>
              </div>
              <h1 className="text-2xl ">Loading</h1>
            
      </section>  
    )
}