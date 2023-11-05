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
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.required]],
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const name = this.categoryForm.controls['name'].value;
      const description = this.categoryForm.controls['description'].value;
      // Add your logic to update the category with new data

      // Close the dialog and pass the updated category data
      this.dialogRef.close(this.category);
    }
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedImageFile = inputElement.files[0];
      this.displaySelectedImage(selectedImageFile);
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