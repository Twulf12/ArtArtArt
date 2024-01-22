import { Component } from '@angular/core';
import { ArtImageComponent } from '../../components/art-image/art-image.component';
import { PostQuery } from '../../_models/post';
import { Server } from '../../_services/server.service';
import { NgIf,NgFor, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArtImageComponent,NgIf,NgFor,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts!: [PostQuery];
  artist_name:string = "asd"
  id:string = "tst"
  artist_id:string = "artistID1"

  postText: string = ''
  selectedFile: File | null = null;

  constructor(
    public server: Server   
  ){

  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.server.queryPost()
    console.log("posts = ",this.posts)
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  async onSubmitPost(){
    console.log(this.postText)
    // if (!this.selectedFile){
    //   return
    // }
    // if (!this.server.user){
    //   return
    // }
    // console.log("call upload!")
    // let post = await this.server.createPost(this.server.user.id,this.postText)
    // let fileID = await this.server.uploadFile(this.selectedFile)
    // await this.server.createArtObject(post.id,this.server.user.id,fileID)
  }

}
