
class ResponseEntity<T>{
  status:true|false;
  code:string;
  body:T;
  cookieData?:{name:string, value:Object, options:any};
  cookieToBeCleared?:{name:string, value:Object, options:any};
  constructor(status:true|false, code:string, body:T, cookieData?:{name:string, value:Object, options:any}, cookieToBeCleared?:{name:string, value:Object, options:any}){
    this.status=status;
    this.code=code;
    this.body=body;
    this.cookieData=cookieData;
    this.cookieToBeCleared=cookieToBeCleared;
  }
}

export default ResponseEntity;