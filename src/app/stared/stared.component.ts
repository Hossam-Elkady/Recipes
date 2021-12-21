import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-stared',
  templateUrl: './stared.component.html',
  styleUrls: ['./stared.component.scss']
})
export class StaredComponent implements OnInit {

  constructor(private _api: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getStaredRecipes();
    this.getRecipes();
    
  }

  stared: string[] = [];

  recipesStared: any[] = [];

  getStaredRecipes() {
    this.stared = JSON.parse(localStorage.getItem("Stared Recipes") || '{}');
  }

  removeFromStared(index: number) {
    this.stared.splice(this.stared.indexOf(this.recipesStared[index].recipe.recipe_id), 1);
    this.recipesStared.splice(this.recipesStared.indexOf(this.recipesStared[index]), 1)
    this._api.localStorage(this.stared);
  }

  getRecipes() {
    this.spinner.show();
    this.stared.forEach(staredRecipe => {
      this._api.getSingleRecipeData(staredRecipe).subscribe(e => {
        this.recipesStared.push(e);
        setTimeout(() => {
          this.spinner.hide()
        }, 1000);
      })
    })
  }

}
