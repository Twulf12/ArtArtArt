import { Component,Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-art-image',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './art-image.component.html',
  styleUrl: './art-image.component.css'
})
export class ArtImageComponent {
  @Input() id!: string;
  @Input() src!: string;
  @Input() artist_name!: string;
  @Input() artist_id!: string;
}
