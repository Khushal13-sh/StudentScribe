import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  baseUrl="http://13.235.80.153:8080/studentManagement/";
  students:any;

  constructor(public http:HttpClient, public app:AppComponent)
  {
    let url=this.baseUrl+'get';
    this.http.get(url).subscribe((data:any)=>
    {
      console.log(data);
      this.students=data;
    });
  }

  delete(student:any)
    {
      let url=this.baseUrl+'delete'+student.id;
      this.http.get(url).subscribe((data:any)=>
      {
        if(data==1){
          let index=this.students.indexOf(student);
          if(index>=0){
            this.students.splice(index,1);
          }
        }
        else{
          alert('Exception on server')
        }
      });  
    }
  

  name:string="";
  marks:number=0;

  add()
    {

      let obj=
      {
        "name":this.name,
        "marks":this.marks
      }

      let url=this.baseUrl+'save';
      this.http.post(url,obj).subscribe((data:any)=>
      {
        if(data==null)
        {
          alert('Exception on Server')
        }
        else
        {
          this.students.push(data);
          this.name="";
          this.marks=0;
        }

      });
    }

  logout(){
    this.app.isLoggedIn=0;
  }
}
