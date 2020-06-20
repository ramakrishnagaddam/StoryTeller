import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../common-api.service';
import {CommonObjectService} from '../../common/commonObject.service';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.css']
})
export class StoryCreateComponent implements OnInit {

  formDataObj: any;
  formTitle:string;
  storyForm: FormGroup;
  audio;
  constructor(private api: CommonApiService, private route: ActivatedRoute, private location: Location, private commonObjectServiceObject:CommonObjectService ) { }



  ngOnInit(): void {
    this.formDataObj = this.commonObjectServiceObject.data;
    this.formTitle = 'Create New Story';
  
    if(this.formDataObj) {
      this.formTitle = "Edit " + this.formDataObj['storyName'];
    }
    const volumeID = this.route.snapshot.params.volumeID;
    this.storyForm = new FormGroup({
      storyName: new FormControl(this.formDataObj?this.formDataObj['storyName']:''),
      storyDesc: new FormControl(this.formDataObj?this.formDataObj['storyDesc']:''),
      credits: new FormControl(this.formDataObj?this.formDataObj['credits']:''),
      duration: new FormControl(this.formDataObj?this.formDataObj['duration']:''),
      volume: new FormControl(volumeID)
    });
  }

  selectedAudio(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.audio = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('storyName', this.storyForm.get('storyName').value);
    formData.append('storyDesc', this.storyForm.get('storyDesc').value);
    formData.append('credits', this.storyForm.get('credits').value);
    formData.append('duration', this.storyForm.get('duration').value);
    formData.append('volume', this.storyForm.get('volume').value);
    formData.append('storyURL', this.audio);

    if(this.formDataObj) {
      formData.append('_id', this.formDataObj['_id']);
      this.api.update('stories', formData).subscribe(
        data => {
          alert('Successfully Updated Story!');
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Create Story. Please contact admin!")
          console.log(error);
        }
      );

    } else {
      this.api.create('stories', formData).subscribe(
        data => {
          alert('Successfully Created Story!');
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Create Story. Please contact admin!")
          console.log(error);
        }
      );
    }
    
  }

}
