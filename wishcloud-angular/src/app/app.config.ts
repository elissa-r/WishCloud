import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routing.module';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),                     
    importProvidersFrom(HttpClientModule)   
  ]
};

