import { Component, OnInit } from '@angular/core';
import { IapiMovie } from 'src/app/models/iapi';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  public myMoviesList?:IapiMovie[] = [];

  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {
    this.getMoviesList();
  }

  public getMoviesList():void {
    this.globalService.getMovies().subscribe(
      (data:any)=>{
      
        data.forEach((element:IapiMovie)=>{

          let auxMovie:IapiMovie = this.transformData(element);
          this.myMoviesList?.push(auxMovie);
        })
      },
      (err: any)=>{
        console.log(err);
      }
    );
    // console.log("getMovies: ",this.myMoviesList)
  }

  private transformData(data:IapiMovie):IapiMovie{

    const {_id,title,director,description,duration,image,genere} = data;

    let auxMovie:IapiMovie = {
      _id,
      title,
      director,
      description,
      duration,
      image,
      genere,
    }

    return auxMovie;

  }

  public showDefinition(event:any){
    const id = event.target.id;

    const title = (document.getElementById(`title_${id}`) as HTMLElement);
    const btn = (document.getElementById(`btn_${id}`) as HTMLElement);

    if(btn !== null && title !==null){
      btn.style.display = event.type === "mouseenter" ? "block" : "none";
      title.style.display = event.type === "mouseenter" ? "block" : "none";
    }
    

  }

}
