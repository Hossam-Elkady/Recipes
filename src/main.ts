import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
document.onclick = (e) => {
  if (e.target == document.querySelector(".fa-search") || e.target == document.querySelector(".form-control")) {
    return
  } else {
    document.querySelector('#search')?.classList.add("d-none");
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
