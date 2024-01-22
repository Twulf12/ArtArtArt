import { Component,Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostQuery } from '../../_models/post';

@Component({
  selector: 'app-art-image',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './art-image.component.html',
  styleUrl: './art-image.component.css'
})
export class ArtImageComponent {
  @Input() post!: PostQuery;
}
