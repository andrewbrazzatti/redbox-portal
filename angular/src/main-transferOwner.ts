import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TransferOwnerModule } from './apps/transfer_owner/transfer_owner.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TransferOwnerModule)
  .catch(err => console.log(err));
