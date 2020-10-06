# NPM module for common functions in backend
useful in a setup with
- serverless stack
- AWS

### Usage
All functions can be imported from their respective modules (results in lowest packages size), e.g.:
```javascript
import { sleep } from 'blob-common/core/sleep';
import { btoa } from 'blob-common/core/base64';
```

All functions can be imported directly from the core, e.g.:
```javascript
import { sleep, btoa } from 'blob-common';
```

NB: the `sanitize` function is **not** included in the core, due to the relatively large size of imported package.

### Generic functions
| Module        |Function                | Description
|---------------|------------------------|-------------------
| `/base64`     | `otob(object)`         | takes an object and coverts to base64 string
| `/base64`     | `btoa(base64String)`   | inverse: takes a base64 string and returns an object
| `/date`       | `now()`                | returns a string of the current date in format `yyyy-mm-dd`
| `/date`       | `expireDate(dateStr)`  | takes a dateStr in standard format and returns a date 30 days later in the standard format
| `/handler`    | `handler(lamdba)`      | wrapper function for event handler (to log errors)
| `/handler`    | `getUserFromEvent(event)`| returns the userId (from AWS cognito user pool) of authenticated User
| `/ids`        | `newPhotoId()`         | returns a newly generated photoId (starts with `P`)
| `/ids`        | `newGroupId()`         | returns a newly generated groupId (starts with `G`)
| `/ids`        | `newAlbumId()`         | returns a newly generated albumId (starts with `A`)
| `/RND`        | `RND`                  | returns a random number between 1 and 15, usable as an index key in dynamoDb to spread database load on very large queries
| `/sleep`      | `sleep(ms)`            | `await sleep(1000)` sleeps for 1 second. Used in tests to wait for dynamoDB to have processed updates
| `/sanitize`   | `sanitize(dirty)`      | sanitizes a string from any sequences that may cause security issues (e.g. when using name string in an email message)

### DynamoDb functions
| Module        |Function                               | Description
|---------------|---------------------------------------|-------------------
| `/db`         | `dynamoDb.get(params)`                | returns a promise for DynamoDb function using the `params`. Uses AWS-SDK, refer to official docs for more info. Also has functions `.put`, `.update`, `.delete`, `query`, `transact` (for `TransactWrite`)
| `/db`         | `dbUpdate(PK, SK, key, newVal)`       | returns a promise for a single update on the database, setting `key` to new value provided in `newVal`
| `/db`         | `dbUpdateMulti(PK, SK, newKV)`        | returns a promise for a single update on the database at multiple keys. `newKV` is an object containing keys to be updated with new values
| `/dbClean`    | `cleanRecord(object)`                 | removes keys `RK`, `datePK`, `dateSK`, `cognitoId` from the object - useful for storing data as derived items in other items (e.g. owner as part of photo object)
| `/dbCreate`   | `dbItem(object)`                      | returns an object with extended keys for database: `createdAt`, `RK`, `datePK`, `dateSK`
| `/dbCreate`   | `dbCreateItem(object)`                | returns a promise to create an expanded item in database from object (object must have `PK` and `SK` keys) 


Some caveats on the specific dynamoDB functions:
- eu-central-1 is the standard region chosen
- to work, there should be a `process.env.photoTable` variable for all functions (except `dynamoDb`)
- database must have `PK` (string) as primary key, and `SK` (string) as sortkey


### S3 and SES functions
| Module        |Function                               | Description
|---------------|---------------------------------------|-------------------
| `/s3`         | `s3.getMetadata(params)`              | returns a promise for an s3 function using the params. Also has a `delete` function
| `/ses`        | `ses.send(params)`                    | sends an email from ses using params

Caveats:
- uses s3 bucket specified in `process.env.photoBucket` or `process.env.devBucket`

### Cognito functions
| Module             |Function                       | Description
|--------------------|-------------------------------|-------------------
| `/cognito`         | `cognito.disableUser(userId)` | disables a user in the cognito user pool
| `/cognito`         | `cognito.deleteUser(userId)`  | deletes a user in the cognito user pool

Caveats:
- uses cognito userpool id from `process.env.userPoolId` or `process.env.devUserPoolId`
