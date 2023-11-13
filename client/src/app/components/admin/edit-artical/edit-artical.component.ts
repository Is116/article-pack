import { Component, Inject } from '@angular/core';
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
  // uploadedImage: string | null = null;

  categories = [] as any[];

  statuses = ['pending', 'approved', 'rejected'];

  constructor(
    public dialogRef: MatDialogRef<EditArticalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articleData: any },
    private fb: FormBuilder
  ) {
    this.article = data.articleData;
    this.articleForm = this.fb.group({
      id: [this.article._id],
      name: [this.article.name, [Validators.required]],
      category: [this.article.category, [Validators.required]],
      content: [this.article.content, [Validators.required]],
      approvalStatus: [this.article.status, [Validators.required]],
      uploadedImage: [this.article.image || ''],
    });

    fetch('http://localhost:25000/api/articles/getCategories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.categories) {
          this.categories = data.categories.map((category: any) => {
            return { id: category._id, name: category.name };
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  ngOnInit() {
    this.populateArticleData(this.article);
  }

  populateArticleData(articleData: any) {
    this.articleForm.setValue({
      id: articleData._id,
      name: articleData.name,
      category: articleData.category,
      content: articleData.content,
      approvalStatus: articleData.status,
      uploadedImage: articleData.image,
    });
  }

  updateArticle() {
    if (this.articleForm.valid) {
      const name = this.articleForm.controls['name'].value;
      const category = this.articleForm.controls['category'].value;
      const content = this.articleForm.controls['content'].value;
      const approvalStatus = this.articleForm.controls['approvalStatus'].value;
      const image = this.articleForm.controls['uploadedImage'].value;

      fetch(
        `http://localhost:25000/api/articles/updateArticle/${this.article._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.article._id,
            name,
            category,
            content,
            status: approvalStatus,
            image,
          }),
        }
      )
        .then((response) => {
          if (response.status !== 200) {
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
        })
        .catch((error) => {
          console.error('Error updating article:', error);
        });

      this.articleForm.reset();
      this.selectedImage = null;
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
          this.articleForm.controls['uploadedImage'].setValue(
            `https://res.cloudinary.com/${cloudName}/image/upload/${data.public_id}.${data.format}`
          );

          console.log(
            'Uploaded Image URL:',
            this.articleForm.controls['uploadedImage'].value
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
