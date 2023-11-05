import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-artical',
  templateUrl: './add-artical.component.html',
})
export class AddArticalComponent implements OnInit {
  articleForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  categories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];

  approvalStatuses = ['pending', 'approved', 'rejected'];

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required]],
      approvalStatus: ['pending'],
    });
  }

  ngOnInit(): void {
  }

  addArticle() {
    if (this.articleForm.valid) {
      const name = this.articleForm.controls['name'].value;
      const category = this.articleForm.controls['category'].value;
      const content = this.articleForm.controls['content'].value;
      const approvalStatus = this.articleForm.controls['approvalStatus'].value;
      const image = this.selectedImage;

      console.log('Article Name:', name);
      console.log('Selected Category ID:', category);
      console.log('Content:', content);
      console.log('Approval Status:', approvalStatus); // Log approval status
      console.log('Image:', image);

      this.articleForm.reset();
      this.selectedImage = null;
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