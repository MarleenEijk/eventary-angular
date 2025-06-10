import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0, AuthGuard } from '@auth0/auth0-angular';

const authConfig = {
  domain: 'dev-vnh6uqhpra3ab7ii.us.auth0.com',
  clientId: 'Bbw8YgqZ5o0zycifhE4tvBMiZV6XNlfY',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'http://localhost:5109',
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAuth0(authConfig),
    { provide: 'authGuard', useExisting: AuthGuard }
  ]
};
