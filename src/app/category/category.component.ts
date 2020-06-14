import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../common-api.service';
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";
import {CommonObjectService} from '../common/commonObject.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  data: any;
  apiURL: string = environment.API;
  constructor(private api:CommonApiService, private commonObjectServiceObject:CommonObjectService, private router: Router) { }

  editCategory(formData) {
    this.commonObjectServiceObject.data = formData;
    this.router.navigate(['category']);
  }

  addCategory() {

    this.commonObjectServiceObject.data = null;
    this.router.navigate(['category']);
  }
  
  ngOnInit(): void {
    this.api.fetch('category').subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
