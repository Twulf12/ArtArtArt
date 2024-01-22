import { Component } from '@angular/core';
import { ArtImageComponent } from '../../components/art-image/art-image.component';
import { ArtImg } from '../../_models/art';
import { AuthenticationService } from '../../_services/auth.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArtImageComponent,NgIf,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  artImgs!: [ArtImg];
  artist_name:string = "asd"
  id:string = "tst"
  artist_id:string = "artistID1"

  constructor(
    public authService: AuthenticationService   
  ){

  }


}
