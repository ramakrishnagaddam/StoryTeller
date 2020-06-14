import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../common-api.service';
import {CommonObjectService} from '../../common/commonObject.service';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.css']
})
export class VolumeCreateComponent implements OnInit {

  volumeForm: FormGroup;
  formData: any;
  formTitle: string;
  constructor(private api: CommonApiService, private route: ActivatedRoute, private location: Location ,private commonObjectServiceObject:CommonObjectService) { }
  categoryID: string;

  ngOnInit(): void {


    this.formData = this.commonObjectServiceObject.data;
    this.formTitle = 'Create New Volume';

    if(this.formData) {
      this.formTitle = "Edit " + this.formData['volumeName'];
    }
    this.categoryID = this.route.snapshot.params.categoryID;
    this.volumeForm = new FormGroup({
      volumeName: new FormControl(this.formData?this.formData['volumeName']:''),
      currency: new FormControl(this.formData?this.formData['currency']:''),
      cost: new FormControl(this.formData?this.formData['cost']:''),
      category: new FormControl(this.categoryID)
    });
  }

  onSubmit() {
    console.log(this.volumeForm.value);
    if(this.formData) {
      this.api.updateByJson('volume', this.volumeForm.value).subscribe(
        data => {
          alert('Successfully Created!');
          console.log(data);
        },
        error => {
          alert('Unable Create Volume. Please contact admin!');
          console.log(error);
  
        }
      );

    } else {
      this.api.createByJson('volume', this.volumeForm.value).subscribe(
        data => {
          alert('Successfully Created!');
          console.log(data);
        },
        error => {
          alert('Unable Create Volume. Please contact admin!');
          console.log(error);
  
        }
      );
    }

  }

}
