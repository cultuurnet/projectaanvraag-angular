# Configuration
The `config.dist.json` file at the root of the project holds the default config. You can make your own adjustments and write them to `config.json`. `config.dist.json` will be ignored when `config.json` is present.
 
##Current configuration options
### apiUrl
 The location of the API. This option is required as it will be used to prefix all API calls.
```json
{
  "apiUrl": "http://culpas-silex.dev/"
}
```

### basePath
 When left empty the base path is assumed to be the root from which the application is served. If the app is located in a sub-directory for example: *public/app/* you add the path to the directory with a leading slash as the basePath property. This will take care of correctly serving all the assets and generating URLs while routing.
```json
{
  "basePath": "/public/app/"
}
```

### insightly
Configuration of fields that can be used in insightly.

```json
"insightly": {
    "customFields": {
      "vat": "ORGANISATION_FIELD_1"
    }
  }
  ```
