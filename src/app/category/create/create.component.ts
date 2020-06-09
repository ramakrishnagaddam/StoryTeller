import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonApiService } from '../../common-api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  categoryForm: FormGroup;
  image;
  constructor(private api: CommonApiService, private location: Location) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(),
      subtitle: new FormControl(),
      categoryDesc: new FormControl()
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
