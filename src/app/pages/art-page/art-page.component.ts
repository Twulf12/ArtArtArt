import { Component,Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { PostQuery } from '../../_models/post';
import { Server } from '../../_services/server.service';


@Component({
  selector: 'app-art-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './art-page.component.html',
  styleUrl: './art-page.component.css'
})
export class ArtPageComponent {
  post!: PostQuery;
  constructor(
    private route: ActivatedRoute,
    public server: Server   
    ) {}

  async ngOnInit() {
    const id = this.route.snapshot.queryParams['id']
    this.post = await this.server.getPost(id)
  }
}
