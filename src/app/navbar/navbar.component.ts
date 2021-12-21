import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {

  constructor(private _ApiService: ApiService, private _router: Router, private _route: ActivatedRoute) { }

  search: any;
  categories = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green',
    'pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red', 'pepper', 'tomato', 'beetroot',
    'brussel', 'sprouts', 'peas', 'zucchini', 'radish', 'sweet', 'potato', 'artichoke', 'leek', 'cabbage',
    'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon',
    'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry',
    'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit',
    'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit',
    'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon',
    'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake',
    'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam',
    'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham',
    'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi',
    'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork',
    'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs']

  registered: boolean = false;
  localStorage: any;
  ngOnInit(): void {
  }
  userName: any;
  ngDoCheck(): void {
    localStorage.getItem("Recipe Email") ? this.registered = true : this.registered = false;
    this.userName = localStorage.getItem("user's Name")  
  }
  SignOut() {
    localStorage.removeItem("Recipe Email");
    localStorage.removeItem("user's Name");
    localStorage.removeItem("Stared Recipes");
  }


  getRecipeCategory(category: any) {
    category.target.innerText
    this._router.navigateByUrl(`/home/${category.target.innerText}`)
  }

  showSearchBar() {
    document.querySelector('#search')?.classList.contains("d-none") ?
      document.querySelector('#search')?.classList.remove("d-none") :
      document.querySelector('#search')?.classList.add("d-none");
  }

  redirect(category: string) {
    this._router.navigateByUrl(`home/${category}`);
  }

  currentCategory: string = '';

  selectedCategory: any;

  onCategoryChanged(currentCategory: any) {
    this.selectedCategory = this.getSelectedProductByName(currentCategory);
    if (this.selectedCategory == undefined) {
      this._router.navigateByUrl("./notfound")
    } else {
      this._router.navigateByUrl(`home/${this.selectedCategory}`);
    }
  }

  getSelectedProductByName(selectedName: string) {
    return this.categories.find(category => category === selectedName);
  }

}
