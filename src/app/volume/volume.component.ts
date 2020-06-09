import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../common-api.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  data: any;
  constructor( private api:CommonApiService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const categoryID = this.route.snapshot.params.categoryID;
    this.api.fetch('category').subscribe(
      data => {
        data.forEach(element => {
          if(element._id === categoryID) {
            this.data = element.volume;
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}
