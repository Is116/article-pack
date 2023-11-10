import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  uploadedImage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  createCategory() {
    if (this.categoryForm.valid) {
      const name = this.categoryForm.controls['name'].value;
      const description = this.categoryForm.controls['description'].value;
      const image = this.uploadedImage;

      // send data to server with API localhost:25000/api/articles/addCategory
      fetch('http://localhost:25000/api/articles/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, image }),
      })
        .then((response) => {
          // if response status is not 201, show error message
          if (response.status !== 201) {
            alert('Invalid data');
            return;
          }
          return response.json();
        })
        .then((data) => {
          // show success message only if response status is 201
          if (data.message) {
            alert(data.message);
          }
        });
    }
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedImageFile = inputElement.files[0];
      this.displaySelectedImage(selectedImageFile);

      const cloudName = 'doef5xnli';
      const apiKey = '178264359278328';

      // Create a FormData object and rename it to imageData
      const imageData = new FormData();
      imageData.append('file', selectedImageFile);
      imageData.append('api_key', apiKey);
      imageData.append('upload_preset', 'px7vcph3');

      // Upload the selected image to Cloudinary using FormData
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: imageData,
      })
        .then((response) => {
          if (response.status !== 200) {
            alert('Error uploading image to Cloudinary');
            return;
          }
          return response.json();
        })
        .then((data) => {
          // Extract the public_id and format from the data object and create the URL
          this.uploadedImage = `https://res.cloudinary.com/${cloudName}/image/upload/${data.public_id}.${data.format}`;

          // Now, uploadedImage contains the URL as a single string
          console.log('Uploaded Image URL:', this.uploadedImage);
        });
    }
  }

  displaySelectedImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
