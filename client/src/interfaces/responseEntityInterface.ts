
class ResponseEntity<T>{
  status:true|false;
  code:string;
  body:T;
  constructor(status:true|false, code:string, body:T){
    this.status=status;
    this.code=code;
    this.body=body;
  }
}

export default ResponseEntity;