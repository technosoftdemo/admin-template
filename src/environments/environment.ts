// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var apiConfig: any;
export const environment = {
  production: false,
  apiUrl: 'https://tedapi.technosoftcorp.net/',
  productsApiSuffix:'products-api',
  cartAPISuffix:'cart-api',
  //baseHref: document.getElementsByTagName('base')[0].href,
  encryptionKey:'',
  cdnURL:'',
  apiGatewayUrl:'https://tedapi.technosoftcorp.net/',
  codeQualityUrl:'https://tedapi.technosoftcorp.net/usr-api/',
  logApiUrl:'https://tedapi.technosoftcorp.net/products-api/v1/logs'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
