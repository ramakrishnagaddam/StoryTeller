import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../common-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  data: any;
  apiURL: string = environment.API;
  constructor(private api:CommonApiService ) { }

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
