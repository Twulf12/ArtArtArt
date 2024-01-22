
export class Post {
    id!: string;
    creator_id!: Number;
    text!: string;
}
export class PostQuery {
    id!: string;
    creator_id!: string;
    text!: string;
    art_id!: string;
    artist_nickname!: string;
    created_at!: Date;
}