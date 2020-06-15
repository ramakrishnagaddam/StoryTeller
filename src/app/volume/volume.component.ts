import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../common-api.service';
import {Router} from "@angular/router";
import {CommonObjectService} from '../common/commonObject.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  data: any;
  constructor( private api:CommonApiService, private route: ActivatedRoute, private commonObjectServiceObject:CommonObjectService, private router: Router ) { }
  
  editVolume(formData) {

    this.commonObjectServiceObject.data = formData;
    this.router.navigate([this.route.snapshot.params.categoryID+'/volume']);
  }

  addVolume() {

    this.commonObjectServiceObject.data = null;
    this.router.navigate([this.route.snapshot.params.categoryID+'/volume']);
  }

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
