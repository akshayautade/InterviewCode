import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users:Array<any> =[]
  fileUrl = environment.fileUrl
  constructor(private service : UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.service.getUser().subscribe(user =>{
      console.log(user);
      this.users = user;
    })
  }

  delete(id){
    this.service.deleteUser(id).subscribe(res =>{
      console.log(res);
      if(res){
        alert("Deleted successfully")
        this.getUser()
      }
    })
  }

  // playAudio(file){
  //   let audio = new Audio();
  //   audio.src = this.fileUrl+file;
  //   audio.load();
  //   audio.play();

  // }

}
