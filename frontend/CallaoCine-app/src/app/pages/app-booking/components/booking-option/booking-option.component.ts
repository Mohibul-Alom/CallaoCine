import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IapiAuditorium, IapiMovie, IapiSessions } from 'src/app/models/iapi';
import { IappAuditorium, IappSession } from 'src/app/models/iapp';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-option',
  templateUrl: './booking-option.component.html',
  styleUrls: ['./booking-option.component.scss'],
})

export class BookingOptionComponent implements OnInit {

  public name!: string;
  
  public movieDetail!: IapiMovie;
  public sessions: IappSession[] = [];
  public userOptions: IappSession[] = []; //all options available

  public isSessionAvailable: Boolean = false;
  public isSessionSelected:Boolean = false;
  public optionChoosed!: IappSession;

  public today:Date = new Date();
  public nextMonth:Date = new Date(new Date().setDate(this.today.getDate() + 30));

  public minDate!:{ year: number; month: number; day: number};
  public maxDate!:{ year: number; month: number; day: number};

  //ngModel
  public model!: NgbDateStruct;
  public date!: { year: number; month: number; };


  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });
    this.getMovies(this.name);    
    this.minDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
    this.maxDate = {year:this.nextMonth.getFullYear(),month: this.nextMonth.getMonth() + 1, day: this.nextMonth.getDate()};

  }


  public selectedOption(userSelected:IappSession){
    
    const {id, day, month, year, hour, minute } = userSelected;

    this.isSessionSelected = true;

    this.optionChoosed = {
      id,
      day,
      month,
      year,
      hour,
      minute,
    }

  }

  public dateSelected(model:NgbDateStruct) {

    this.userOptions = [];
    this.isSessionSelected = false;

    this.sessions.forEach((session) =>{

      if(session.day === model.day){
        this.userOptions.push(session);
      }

    })
    if(this.userOptions.length !== 0){
      this.isSessionAvailable = true;
      window.scrollTo(0,document.body.scrollHeight);
    }else{
      this.isSessionAvailable = false;
    }

  }

  private getMovies(name: string): void {
    this.bookingService.getMoviesByName(name).subscribe(
      (data: any) => {
        this.movieDetail = this.transformDataMovie(data[0]);
        this.getSessions(this.movieDetail._id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private getSessions(id: string): void {

    this.bookingService.getSessionsByMovieId(id).subscribe(
      (data: any)=>{

        //custom funtion for shorting array
        data.sort(this.compare);

        data.forEach((element:IapiSessions) => {
          this.trasformDataSession(element.date,element._id);
        });
      },
      (err:any)=>{
        console.log(err)
      }
    )

  }


  private transformDataMovie(data: IapiMovie): IapiMovie {
    const { _id, title, director, description, duration, image, genere } = data;

    let auxMovie: IapiMovie = {
      _id,
      title,
      director,
      description,
      duration,
      image,
      genere,
    };
    return auxMovie;
  }

  private trasformDataSession(date: Date, id: string): IappSession{
    let auxAppSession: IappSession;

    let dateSession = new Date(date);
    
    auxAppSession = {
        id,
        day: dateSession.getDate(),
        month: dateSession.getMonth() + 1,
        year: dateSession.getFullYear(),
        hour: dateSession.getHours().toString(),
        minute: dateSession.getMinutes().toString() === "0" ? "00":dateSession.getMinutes().toString(),
      };

      this.sessions.push(auxAppSession);
      return auxAppSession;
  }

  private compare(a:IapiSessions,b:IapiSessions):number{

    return new Date(a.date).getTime() - new Date(b.date).getTime();

  }

  
}
