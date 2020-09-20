# NPM module for common functions in backend
useful in a setup with
- serverless stack
- AWS


### Generic functions
| Module        |Function                | Description
|---------------|------------------------|-------------------
| `/base64`     | `otob(object)`         | takes an object and coverts to base64 string
| `/base64`     | `btoa(base64String)`   | inverse: takes a base64 string and returns an object
| `/date`       | `now()`                | returns a string of the current date in format `yyyy-mm-dd`
| `/date`       | `expireDate(dateStr)`  | takes a dateStr in standard format and returns a date 30 days later in the standard format
| `/ids`        | `newPhotoId()`         | returns a newly generated photoId (starts with `P`)
| `/ids`        | `newGroupId()`         | returns a newly generated groupId (starts with `G`)
| `/ids`        | `newAlbumId()`         | returns a newly generated albumId (starts with `A`)
| `/RND`        | `RND`                  | returns a random number between 1 and 15, usable as an index key in dynamoDb to spread database load on very large queries
| `/sleep`      | `async sleep(ms)`      | `await sleep(1000)` sleeps for 1 second. Used in tests to wait for dynamoDB to have processed updates


All functions can be imported directly from the core, e.g.:
```javascript
import { sleep, btoa } from 'blob-common';
```

Or (to lower package size) from their respective modules, e.g.:
```javascript
import { sleep } from 'blob-common/core/sleep';
import { btoa } from 'blob-common/core/helpers';
```
