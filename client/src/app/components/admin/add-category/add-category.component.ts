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

      fetch('http://localhost:25000/api/articles/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, image }),
      })
        .then((response) => {
          if (response.status !== 201) {
            alert('Invalid data');
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (data.message) {
            alert(data.message);
          }
          window.location.reload();
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

      const imageData = new FormData();
      imageData.append('file', selectedImageFile);
      imageData.append('api_key', apiKey);
      imageData.append('upload_preset', 'px7vcph3');

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
          this.uploadedImage = `https://res.cloudinary.com/${cloudName}/image/upload/${data.public_id}.${data.format}`;

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
