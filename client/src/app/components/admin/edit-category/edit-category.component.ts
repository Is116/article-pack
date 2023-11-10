import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  categoryForm: FormGroup;
  category: any;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private fb: FormBuilder
  ) {
    this.category = data.category;
    this.categoryForm = this.fb.group({
      id: [this.category.id, [Validators.required]],
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.required]],
      uploadedImage: this.category.imageUrl || '',
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const name = this.categoryForm.controls['name'].value;
      const description = this.categoryForm.controls['description'].value;
      const image = this.categoryForm.controls['uploadedImage'].value;

      // send data to server with API localhost:25000/api/articles/updateCategory
      fetch(
        'http://localhost:25000/api/articles/updateCategory/' +
          this.category.id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description, image }),
        }
      )
        .then((response) => {
          // if response status is not 200, show error message
          if (response.status !== 200) {
            alert('Invalid data');
            return;
          }
          return response.json();
        })
        .then((data) => {
          // show success message only if response status is 200
          if (data.message) {
            alert(data.message);
          }
        });

      // Close the dialog and pass the updated category data
      this.dialogRef.close(this.category);
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
          this.categoryForm.controls['uploadedImage'].setValue(
            `https://res.cloudinary.com/${cloudName}/image/upload/${data.public_id}.${data.format}`
          );

          // Now, uploadedImage contains the URL as a single string
          console.log(
            'Uploaded Image URL:',
            this.categoryForm.controls['uploadedImage'].value
          );
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
