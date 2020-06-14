import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonApiService } from '../common-api.service';
import { environment } from '../../environments/environment';
import {CommonObjectService} from '../common/commonObject.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  data: any;
  apiURL: string = environment.API;
  constructor(private api:CommonApiService, private route: ActivatedRoute, private commonObjectServiceObject:CommonObjectService, private router: Router ) { }

  editStory(formData) {

    this.commonObjectServiceObject.data = formData;
    this.router.navigate([this.route.snapshot.params.categoryID+'/'+this.route.snapshot.params.volumeID+'/story']);
  }

  addStory() {
    this.commonObjectServiceObject.data = null;
    this.router.navigate([this.route.snapshot.params.categoryID+'/'+this.route.snapshot.params.volumeID+'/story']);
  }

  ngOnInit(): void {
    const categoryID = this.route.snapshot.params.categoryID;
    const volumeID = this.route.snapshot.params.volumeID;
    this.api.fetch('category').subscribe(
      data => {
        data.forEach(categoryData => {
          if( categoryData._id === categoryID ) {
            categoryData.volume.forEach(element => {
              if(element._id === volumeID) {
                this.data = element.stories;
              }
            });
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}

