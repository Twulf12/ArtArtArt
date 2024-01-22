import { Component,Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-art-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './art-page.component.html',
  styleUrl: './art-page.component.css'
})
export class ArtPageComponent {
  @Input() id!: string;
  @Input() src!: string;
  @Input() artist_name!: string;
  @Input() artist_id!: string;
}
