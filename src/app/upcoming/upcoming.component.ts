import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../common-api.service';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
import { CommonObjectService } from '../common/commonObject.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  data: any;
  apiURL: string = environment.API;
  constructor(private api:CommonApiService, private commonObjectServiceObject:CommonObjectService, private router: Router) { }

  ngOnInit(): void {
    this.api.fetch('upcoming').subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addUpcoming() {
    this.commonObjectServiceObject.data = null;
    this.router.navigate(['upcoming/create']);
  }

  editCategory(formData) {
    this.commonObjectServiceObject.data = formData;
    this.router.navigate(['upcoming/create']);
  }

}
