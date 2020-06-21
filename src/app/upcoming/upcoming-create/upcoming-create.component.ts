import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonApiService } from '../../common-api.service';
import {CommonObjectService} from '../../common/commonObject.service';

@Component({
  selector: 'app-upcoming-create',
  templateUrl: './upcoming-create.component.html',
  styleUrls: ['./upcoming-create.component.css']
})
export class UpcomingCreateComponent implements OnInit {

  formDataObj:any;
  upcomingForm: FormGroup;
  formTitle :string;
  constructor(private api: CommonApiService, private location: Location, private commonObjectServiceObject: CommonObjectService) { }

  ngOnInit(): void {
    this.formDataObj = this.commonObjectServiceObject.data;
    this.formTitle = "Create New Event";
    if(this.formDataObj) {
      this.formTitle = "Edit " + this.formDataObj['upcoming_event'];
    }
    this.upcomingForm = new FormGroup({
      upcoming_event: new FormControl(this.formDataObj?this.formDataObj['upcoming_event']:''),
      fromDate: new FormControl(this.formDataObj?this.formDataObj['fromDate']:''),
      toDate: new FormControl(this.formDataObj?this.formDataObj['toDate']:'')
    });
  }

  onSubmit() {
    if(this.formDataObj) {

      this.api.update('upcoming', this.upcomingForm.value).subscribe(
        data => {
          alert("Successfully Updated!");
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Update. Please contact admin!");
          console.log(error);
  
        }
      );
    } else {
      this.api.createByJson('upcoming', this.upcomingForm.value).subscribe(
        data => {
          alert("Successfully Created!");
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Create. Please contact admin!");
          console.log(error);
  
        }
      );
    }
  }
}
