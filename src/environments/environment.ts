// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   apiUrlOAuth: 'http://localhost:3003/api/v1/auth',
//   apiUrlClient: 'http://localhost:3001/api/v1/client',
//   apiUrlUser: 'http://localhost:3002/api/v1/user',
//   apiUrlMenu: 'http://localhost:3005/api/v1/menu',
//   apiUrlHostal: 'http://localhost:3004/api/v1/hostal',
//   apiUrlReservation: 'http://localhost:3000/api/v1/reservation',
  
// };
export const environment = {
  production: false,
  apiUrlOAuth: 'http://137.135.92.123:3003/api/v1/auth',
  apiUrlClient: 'http://137.135.92.123:3001/api/v1/client',
  apiUrlUser: 'http://137.135.92.123:3002/api/v1/user',
  //apiUrlUser: 'http://localhost:3002/api/v1/user',
  apiUrlMenu: 'http://137.135.92.123:3005/api/v1/menu',
  apiUrlHostal: 'http://137.135.92.123:3004/api/v1/hostal',
  apiUrlReservation: 'http://137.135.92.123:3000/api/v1/reservation',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
