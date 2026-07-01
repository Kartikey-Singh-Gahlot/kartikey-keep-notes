import ResponseEntity from "../interfaces/responseEntityInterface";

export async function fetchApiService(endPoint:string, method:string, body:Object):Promise<ResponseEntity<Object>>{
   try{
      const options: RequestInit = {
         method:method,
         headers:{
            "Content-Type": "application/json",
         },
         credentials:"include"
      };
      if (method !== "GET" && method !== "HEAD" && body) {
         options.body = JSON.stringify(body);
      }
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_SERVICE_URL}/${endPoint}`, options);
      return apiResponse.json();
   }
   catch(err:any){
      return {
         status:false,
         code:"INTERNAL_SERVER_ERROR",
         body:"Internal Server Error"
      }
   }
}