import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideCloudinaryLoader, provideImageKitLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(), withHashLocation() ), provideHttpClient()]
};
