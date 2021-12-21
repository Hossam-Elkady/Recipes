import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  localStorage(IDs: string[]) {
    localStorage.setItem("Stared Recipes", JSON.stringify(IDs))
  }
  getApi(category: string) {
    return this._http.get(`https://forkify-api.herokuapp.com/api/search?q=${category}`)
  }

  getSingleRecipeData(id: string) {
    return this._http.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  }

}
