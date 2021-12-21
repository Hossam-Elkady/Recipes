import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck, OnDestroy {
  constructor(
    private _api: ApiService,
    private _Activatedroute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }


  checkStars() {
    this.stars = document.querySelectorAll(".fa-star")
    this.stars[this.index].clasList.remove("shiny");
  }

  ngDoCheck(): void {
    if (!localStorage.getItem("Recipe Email")) {
      localStorage.removeItem("Stared Recipes")
      // if (this.index < 0){
      //   this.checkStars();
      // }
    }
  }
  response: any[] = [];
  category: any;
  StarsIndex: any;

  ngOnInit(): void {
    this.checkRoute();
  }

  rouetSubscription: any;

  checkRoute() {
    this.rouetSubscription = this._Activatedroute.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.getApi(this.category);
    });
  }

  apiSubscription: any;

  getApi(cat: any) {
    this.spinner.show();
    this.apiSubscription = this._api.getApi(cat).subscribe((res: any) => {
      this.response = res.recipes;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  stars: any;

  staredRecipes: string[] = [];

  token = localStorage.getItem("Recipe Email");

  index: number = 0;

  starRecipe(index: number) {
    this.index = index;
    if (this.token) {
      this.stars = document.querySelectorAll(".fa-star")
      this.stars[index].classList.contains('shiny') ? this.stars[index].classList.remove('shiny') : this.stars[index].classList.add('shiny');

      if (this.staredRecipes.includes(this.response[index].recipe_id)) {
        this.staredRecipes.splice(
          this.staredRecipes.indexOf(this.response[index].recipe_id),
          1
        );
        this._api.localStorage(this.staredRecipes);
      } else {
        this.staredRecipes.push(this.response[index].recipe_id);
        this._api.localStorage(this.staredRecipes);
      }
    }
    else {
      let messages = document.querySelectorAll(".bg-light")
      messages[index].classList.add("warn");
      messages[index].classList.remove("d-none");
      setTimeout(() => {
        messages[index].classList.add("d-none");
      }, 1000);
      // if (this.index > 1) {
      //   this.stars[this.index].classList.remove("shiny")
      // }
    }
  }



  ngOnDestroy(): void {
    if (this.apiSubscription || this.rouetSubscription) {
      this.apiSubscription.unsubscribe();
      this.rouetSubscription.unsubscribe();
    }
  }
}
