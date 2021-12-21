import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private _api: ApiService, private _Activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
  apiSubscription: any;
  id: any;
  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.params['id'];
    this.getRecipeData();
  }
  ingredient: any[] = [];
  data: any;
  getRecipeData() {
    this.spinner.show();
    this.apiSubscription = this._api.getSingleRecipeData(this.id).subscribe(e => {
      this.data = e;
      this.ingredient = this.data.recipe.ingredients;
      setTimeout(() => {
        this.spinner.hide()
      }, 1000);
    })
  }

}
