import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonApiService } from '../../common-api.service';
import {CommonObjectService} from '../../common/commonObject.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  formDataObj:any;
  categoryForm: FormGroup;
  image;
  formTitle :string;
  constructor(private api: CommonApiService, private location: Location, private commonObjectServiceObject: CommonObjectService) { }

  ngOnInit(): void {
    this.formDataObj = this.commonObjectServiceObject.data;
    this.formTitle = "Create New Category";
    if(this.formDataObj) {
      this.formTitle = "Edit " + this.formDataObj['categoryName'];
    }
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(this.formDataObj?this.formDataObj['categoryName']:''),
      subtitle: new FormControl(this.formDataObj?this.formDataObj['subtitle']:''),
      categoryDesc: new FormControl(this.formDataObj?this.formDataObj['categoryDesc']:'')
    });

  }

  selectedImage(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('categoryName', this.categoryForm.get('categoryName').value);
    formData.append('subtitle', this.categoryForm.get('subtitle').value);
    formData.append('categoryDesc', this.categoryForm.get('categoryDesc').value);
    formData.append('categoryImageURL', this.image);
    console.log(formData);
    if(this.formDataObj) {
      formData.append('_id', this.formDataObj['_id']);
      console.log(formData);
      this.api.update('category', formData).subscribe(
        data => {
          alert("Successfully Updated Category!");
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Create Story. Please contact admin!");
          console.log(error);
  
        }
      );
      } else {
      this.api.create('category', formData).subscribe(
        data => {
          alert("Successfully Created Category!");
          console.log(data);
          this.location.back();
        },
        error => {
          alert("Unable Create Story. Please contact admin!");
          console.log(error);
  
        }
      );
    }
  }
}
