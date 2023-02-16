import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  id;
  user;
  image;
  file;
  myReactiveForm: FormGroup;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      'name': new FormControl(null, Validators.required),
      'desc': new FormControl(null),
      'file': new FormControl(null),
      'image': new FormControl(null),

    })

    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        // this.service.getSingleUser(this.id).subscribe(user=>{
        this.service.getSingleUser(this.id).subscribe(user => {
          console.log(user);
          this.user = user;
          this.myReactiveForm.patchValue(user)
        })
      } else {
        this.id = '';
      }

    })
  }

  selectPhoto(event) {
    this.image = event.target.files[0];
  }
  selectFile(event) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    this.myReactiveForm.markAllAsTouched();
    if (this.id != '') {
      this.service.UpdateUser(this.id, this.myReactiveForm.value).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
    }
    else {
      let _formData = new FormData();
      _formData.append("file", this.image);
      this.service.uploadFile(_formData).subscribe(res => {
        this.myReactiveForm.value.image = res[0].filename;
        let _formData = new FormData();
        _formData.append("file", this.file);
        this.service.uploadFile(_formData).subscribe(res => {
          this.myReactiveForm.value.file = res[0].filename;
          this.service.RegisterUser(this.myReactiveForm.value).subscribe(res => {
            alert("Success")
          }, err => {
            console.log(err);
          })
        })
      })
    }
  }
}
