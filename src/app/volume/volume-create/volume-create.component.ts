import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../common-api.service';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.css']
})
export class VolumeCreateComponent implements OnInit {

  volumeForm: FormGroup;

  constructor(private api: CommonApiService, private route: ActivatedRoute, private location: Location ) { }
  categoryID: string;

  ngOnInit(): void {
    this.categoryID = this.route.snapshot.params.categoryID;
    this.volumeForm = new FormGroup({
      volumeName: new FormControl(),
      currency: new FormControl(),
      cost: new FormControl(),
      category: new FormControl(this.categoryID)
    });
  }

  onSubmit() {
    console.log(this.volumeForm.value);
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
