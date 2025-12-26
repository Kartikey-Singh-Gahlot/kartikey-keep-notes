import "./components.css";


export default function Loader({theme}){
    
    
    return(
      <section className={`h-screen flex justify-center items-center  gap-4`}>
            
              <div className={`animate-spin  justify-center items-center ${(theme)?"border-green-800":"border-amber-50"} text-2xl h-10 w-10 border-5 border-b-transparent border-r-transparent  border-dotted rounded-full loadingMainText`}>
              </div>
              <h1 className="text-2xl ">Loading</h1>
            
      </section>  
    )
}