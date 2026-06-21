import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { stateProviders } from './app/state/store.config';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), ...stateProviders]
}).catch(err => console.error(err));


