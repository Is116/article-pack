import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-artical',
  templateUrl: './add-artical.component.html',
})
export class AddArticalComponent implements OnInit {
  articleForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  uploadedImage: string | null = null;
  user: any;

  categories = [] as any[];

  approvalStatuses = ['pending', 'approved', 'rejected'];
  

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required]],
      approvalStatus: ['pending'],
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

  ngOnInit(): void {}

  addArticle() {
    if (this.articleForm.valid) {
      const name = this.articleForm.controls['name'].value;
      const category = this.articleForm.controls['category'].value;
      const content = this.articleForm.controls['content'].value;
      const approvalStatus = this.articleForm.controls['approvalStatus'].value;
      const image = this.uploadedImage;

      this.user = this.userService.getUserData();
      fetch('http://localhost:25000/api/articles/addArticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category,
          content,
          status: approvalStatus,
          image,
          author: this.user.id,
        }),
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
