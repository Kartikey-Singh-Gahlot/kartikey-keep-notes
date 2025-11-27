export default function Features({featureHeading, featureImageLink}){
    return (
       <li className="flex flex-col items-center px-2 py-10  border-[#00000000] rounded-2xl ">
           <img src={featureImageLink} alt="" className="min-[780px]:w-30 w-20" />
           <h1 className="flex w-fit gap-2 px-5 py-1 rounded-[4px] text-[12px]   cursor-pointer  whitespace-nowrap">{featureHeading}</h1>
       </li>
    )
}