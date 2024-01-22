import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { Post, PostQuery } from '../_models/post';

@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  imports: [HttpClientModule],
  selector: 'PageNotFoundComponent',
  template: '',
})
export class Server {

  public user: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // var token = localStorage.getItem("token")
    // if (!token) {
    //   return
    // }
    // var parsed_token = this.parseJwt(token)
    // /* Example
    // {
    //   "Email": "tst123@email.com",
    //   "First_Name": "tst123",
    //   "Last_Name": "123",
    //   "Uid": "61e92bd91d323aeee27436f3",
    //   "exp": 1642757895,
    //   "iss": "Grandora user service"
    // }
    // */
    // // if (parsed_token.iss !== "Grandora user service") {
    // //   return
    // // }
    // if (Date.now() > parsed_token.exp * 1000) {
    //   // TODO maybe message/notify that session is expired
    //   return
    // }
    // this.user = new User;
    // for (var key in parsed_token) {
    //   if (this.user.hasOwnProperty(key.toLowerCase())) {
    //     this.user[key.toLowerCase()] = parsed_token[key];
    //   }
    // }
    // this.user = (parsed_token as User)
    // this.user.user_id = parsed_token.uid
    // this.user.token = token
  }

  public isLoggedIn() {
    return this.user != null
  }

  async login(username: string, password: string): Promise<User> {
    try {
      console.log(`login username:${username} password:${password}`)
      let user = await this.getUser(username)
      console.log("result user")
      console.log(user)
      if (password != user.password) {
        alert("incorrect password")
        throw Error("incorrect password")
      }
      this.user = user
      localStorage.setItem("user", JSON.stringify(user))
      return user;
    } catch (error) {
      // console.log(error)
      throw error
    }
  }

  async signup(username: string, password: string): Promise<boolean> {
    console.log(`signup username:${username} password:${password}`)

    let user = await this.getUser(username)
    if (user) {
      alert("user with same username already exist")
      return false
    }

    try {
      await this.createUser(username, password)
      return true;
    } catch (error) {
      // console.log(error)
      throw error
    }
  }

  async getUser(username: string): Promise<User> {
    const query = `SELECT * FROM USER where user.username = '${username}'`
    let response = await this.execQuery(query)
    if (!response.ok) {
      throw new Error(await response.text())
    }
    let res = await response.json()
    console.log("res")
    console.log(res)
    // console.log("res.length")
    // console.log(res.length)
    // console.log(res[0])
    return res[0] as User;
  }

  async createUser(username: string, password: string): Promise<boolean> {
    const query = `INSERT INTO user (username, password, created_at)
                    VALUES('${username}', '${password}','${this.formatDate(new Date())}');`
    let response = await this.execQuery(query)
    if (!response.ok) {
      throw new Error(await response.text())
    }

    let res = await response.json()
    console.log("res")
    console.log(res)
    return true;
  }

  async createPost(userID: string, text: string): Promise<Post> {
    const query = `INSERT INTO Post (creator_id, text, created_at)
                    VALUES('${userID}', '${text}','${this.formatDate(new Date())}');`
    let response = await this.execQuery(query)
    if (!response.ok) {
      throw new Error(await response.text())
    }
    let res = await response.json()
    console.log("createPost res")
    console.log(res)
    let postID = res.insertId
    const query2 = `SELECT * FROM Post WHERE id = '${postID}'`
    response = await this.execQuery(query2)
    if (!response.ok) {
      throw new Error(await response.text())
    }
    res = await response.json()
    return res[0] as Post;
  }

  async createArtObject(ownerID: string, artistID: string, artID: string): Promise<boolean> {
    const query = `INSERT INTO ArtObject (id,owner_id, owner_type,author_id, created_at)
                    VALUES('${artID}','${ownerID}', 'post','${artistID}','${this.formatDate(new Date())}');`
    let response = await this.execQuery(query)
    if (!response.ok) {
      throw new Error(await response.text())
    }

    let res = await response.json()
    console.log("res")
    console.log(res)
    return true;
  }

  async queryPost(): Promise<[PostQuery]> {
    const query = `SELECT
                      Post.*,
                      ArtObject.id AS art_id,
                      Artist.nickname AS artist_nickname
                    FROM
                        Post
                    LEFT JOIN
                        ArtObject ON Post.id = ArtObject.owner_id AND ArtObject.owner_type = 'post'
                    LEFT JOIN
                        Artist ON Post.creator_id = Artist.id;`
    let response = await this.execQuery(query)
    if (!response.ok) {
      throw new Error(await response.text())
    }

    let res = await response.json()
    console.log("queryPost res")
    console.log(res)
    return res as [PostQuery];
  }

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await this.http.post<{ file_id: string }>("http://localhost:3000/upload", formData)
        .pipe(
          retry(3),
          catchError(this.handleError)
        ).toPromise()
      if (!response || !response.file_id) {
        throw new Error('No response or file_id is missing from the response');
      }
      return response.file_id;
    }
    catch (error) {
      console.error('Upload failed:', error);
      throw error; // Re-throw the error
    }
  }


  async logout() {
    try {
      localStorage.removeItem("token")
      this.user = null
    } catch (error) {
      // console.log(error)
      throw error
    }
  }


  execQuery(query: string): Promise<Response> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
    return fetch(`http://localhost:3000/execute-query`, requestOptions)
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
