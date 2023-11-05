import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-artical',
  templateUrl: './edit-artical.component.html',
})
export class EditArticalComponent {
  articleForm: FormGroup;
  article: any;
  selectedImage: string | ArrayBuffer | null = null;

  categories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];

  statuses = ['pending', 'approved', 'rejected'];

  constructor(
    public dialogRef: MatDialogRef<EditArticalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articleData: any },
    private fb: FormBuilder
  ) {
    this.article = data.articleData;
    this.articleForm = this.fb.group({
      name: [this.article.name, [Validators.required]],
      category: [this.article.category, [Validators.required]],
      content: [this.article.content, [Validators.required]],
      approvalStatus: [this.article.status, [Validators.required]],
    });
  }

  ngOnInit() {
    this.populateArticleData(this.article);
  }

  populateArticleData(articleData: any) {
    this.articleForm.setValue({
      name: articleData.name,
      category: articleData.category,
      content: articleData.content,
      approvalStatus: articleData.approvalStatus || '', // Provide a default value
    });
  }

  updateArticle() {
    if (this.articleForm.valid) {
      const name = this.articleForm.controls['name'].value;
      const category = this.articleForm.controls['category'].value;
      const content = this.articleForm.controls['content'].value;
      const approvalStatus = this.articleForm.controls['approvalStatus'].value;
      const image = this.selectedImage;

      // Handle form submission or update
      console.log('Updated Article Name:', name);
      console.log('Updated Category:', category);
      console.log('Updated Content:', content);
      console.log('Updated Approval Status:', approvalStatus);
      console.log('Updated Image:', image);

      // Clear the form and selected image
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}