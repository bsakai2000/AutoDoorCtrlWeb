import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as serverGlobals from './globals';



@Injectable()
export class StudentService {

  // constructors needed 
  constructor(private http: HttpClient, private router:Router) { }

  // gets active student data from api
  getActive():Observable<any> {

    return this.http.get<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/active_user")
  }

  // gets inactive student data from api
  getRequest():Observable<any> {
    return this.http.get<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/inactive_user")
  }

  // adds student request to db through api
  register(username, _callback):void {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/request-access",body,{headers: headers}).subscribe(
      data =>{
        console.log("user added to Database as request");
	_callback();
      },
      err =>{
      console.log("err: issue with server");
    })
  }

  // adds one student to the active student list
  addOne(username, _callback):void {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/addtoActive",body,{headers: headers}).subscribe(
      data =>{
        console.log("user added to Database as request");
        _callback();
      },
      err =>{
        console.log("err: issue with server");
      })
  }

  // adds all students with request to the active students list
  addAll(_callback):void {
    
    this.http.get<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/addAll").subscribe(
      data =>{
        console.log(" All request users added to Database as Active");
	_callback();
      },
      err =>{
      console.log("err: issue with server");
      })
  }
// removes a student from the active student list
  remove(username, _callback):void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    headers.append('Access-Control-Allow-Origin', serverGlobals.dbServer);
    let body = JSON.stringify({RCSid:username});
    this.http.post<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/remove",body,{headers: headers}).subscribe(
      data =>{
        console.log("user removed from Database");
	_callback();
      },
      err =>{
      console.log("err: issue with server");
      })
  }
// lists the student complaints stored in the db
  listComplaints():Observable<any>{
    return this.http.get<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/get-complaints")

  }

  // adds student complaint to the db
  submitComplaint(location,message,isLI:boolean):void{
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json');
    let body = JSON.stringify({Location:location, Message:message});
    this.http.post<any>(serverGlobals.dbServer + ":" + serverGlobals.dbPort + "/api/submit-complaint",body,{headers: headers}).subscribe(
      data =>{
        console.log("complaint added to Database as request");
        if(isLI){
          this.router.navigate(['button']);
        }
        else{
          this.router.navigate(['login']);
        }
        
      },
      err =>{
        console.log("err: issue with server");
      })

  }
}
