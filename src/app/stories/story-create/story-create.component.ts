import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CommonApiService } from '../../common-api.service';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.css']
})
export class StoryCreateComponent implements OnInit {

  storyForm: FormGroup;
  audio;
  constructor(private api: CommonApiService, private route: ActivatedRoute, private location: Location ) { }

  ngOnInit(): void {
    const volumeID = this.route.snapshot.params.volumeID;
    this.storyForm = new FormGroup({
      storyName: new FormControl(),
      storyDesc: new FormControl(),
      credits: new FormControl(),
      duration: new FormControl(),
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
    this.api.create('stories', formData).subscribe(
      data => {
        alert('Successfully Created!');
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
