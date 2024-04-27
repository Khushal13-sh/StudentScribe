import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public http:HttpClient, public app:AppComponent)
  {
  }

  baseUrl="http://13.235.80.153:8080/studentManagement/";

  username:string='';
  password:string='';

  login(){
    let url=this.baseUrl+'login'+this.username;
    this.http.post(url,this.password).subscribe((data:any)=>{
      if(data==1){
        this.app.isLoggedIn=1;
      }
      else if(data==2){
        alert('wrong username');
      }
      else if(data==3){
        alert('Multiple account with same username');
      }
      else if(data==4){
        alert('Invalid Password');
      }
      else{
        alert('Invalid credentials');
      }

    });

  }

}
