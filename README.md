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
| `/date`       | `diffDate(dateStr, days)`  | takes a dateStr in standard format and difference, returns a dateStr in the standard format
| `/date`       | `expireDate(dateStr)`  | takes a dateStr in standard format and returns a date 30 days later in the standard format
| `/handler`    | `handler(lamdba)`      | wrapper function for event handler (to log errors)
| `/handler`    | `getUserFromEvent(event)`| returns the userId (from AWS cognito user pool) of authenticated User
| `/handler`    | `apiCall(promise)`     | async wrapper for promise, returns the a tuple `[err, result]`
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
| `/s3`         | `s3.getMetadata(params)`              | returns a promise for an s3 function using the params.
| `/s3`         | `s3.delete(params)`                   | deletes stuff.
| `/s3`         | `s3.get(params)`                      | gets an object.
| `/s3`         | `s3.list(params)`                     | lists a bucket probably.
| `/s3`         | `s3.getSignedUrl(params)`             | gets a signed url for ADDING a file to s3 (for uploads).
| `/s3`         | `s3.getSignedUrlGet(params)`          | gets a signed url for READING a file from s3.
| `/ses`        | `ses.send(params)`                    | sends an email from ses using params - returns promise
| `/ses`        | `ses.sendEmail(params)`               | sends an email from ses using `{toEmail, fromEmail, subject, data, textData}` - returns promise

NB:
- `toEmail` can be either a string or an array of strings (multiple recipients)

Caveats:
- s3 function uses s3 bucket specified in `process.env.photoBucket` or `process.env.devBucket`


### email helper functions
| Module        |Function                               | Description
|---------------|---------------------------------------|-------------------
| `/email`      | `emailBody(rows)`               | returns email body with rows
| `/email`      | `row(cells)`                    | generic row containing array of cells
| `/email`      | `headerRow(logoSrc, frontendUrl)`| header row with logo, links to frontend
| `/email`      | `footerRow`                     | 
| `/email`      | `photoRow(photoSrc, linkUrl)`   | row containing (header) photo
| `/email`      | `textCell(subtype)`             | cell containing `greeting`, `paragraph` or `buttonEscape` (small text with link)
| `/email`      | `dividerCell(dividerSrc)`       | 
| `/email`      | `buttonCell(text, link)`        | 
| `/email`      | `codeCell(code)`                | big text block centered with code 
| `/email`      | `signatureCell(src)`            | left aligned signature under email
| `/email`      | `greeting(text)`                | 
| `/email`      | `paragraph(text)`               | 
| `/email`      | `buttonEscape(url)`             | 
| `/email`      | `makeEmailSrc(url, width, height)`| returns publicly accessible url for image in S3 bucket

Caveats:
- makeEmailSrc uses s3 bucketname from `process.env.bucket` or `process.env.devBucket`


### Cognito functions
| Module             |Function                       | Description
|--------------------|-------------------------------|-------------------
| `/cognito`         | `cognito.disableUser(userId)` | disables a user in the cognito user pool
| `/cognito`         | `cognito.deleteUser(userId)`  | deletes a user in the cognito user pool

Caveats:
- uses cognito userpool id from `process.env.userPoolId` or `process.env.devUserPoolId`
