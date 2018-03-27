import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LocalAuthModule } from './apps/localAuth/local_auth.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LocalAuthModule)
  .catch(err => console.log(err));
