interface ResponseEntity<T>{
  status:true|false,
  code:string,
  body:T
}

export default ResponseEntity;