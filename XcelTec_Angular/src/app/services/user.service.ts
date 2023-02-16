import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList = environment.backend+"users";
  private user = environment.backend+"user/";
  private updateuser = environment.backend+"user/";
  private uploadUrl = environment.backend+'user';
  private deleteUrl = environment.backend+'user/';
  private uploadPhotoUrl = environment.backend+'uploadImage';
  private uploadFileUrl = environment.backend+'uploadFile';
  constructor(private http: HttpClient) { }

  getUser():Observable<any>{
    return this.http.get(this.userList)
  }

  getSingleUser(id):Observable<any>{
    return this.http.get(this.user+id,{});
  }

  RegisterUser(obj): Observable<any>{
    return this.http.post(this.uploadUrl, obj)
  }
  UpdateUser(id,obj): Observable<any>{
    return this.http.put(this.updateuser+id, obj)
  }

  deleteUser(id){
    return this.http.delete(this.deleteUrl+id)
  }
  uploadFile(file): Observable<any>{
    return this.http.post(this.uploadFileUrl, file);
  }
}
