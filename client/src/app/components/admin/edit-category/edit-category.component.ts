import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const name = this.categoryForm.controls['name'].value;
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
}

