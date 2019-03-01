# google-apps-script-for-aws

Google Apps Script wrapper for authenticated REST API requests to Amazon Web
Services (AWS).

## How To Use

### Paste Source into Project

Add the contents of `aws.js` and `util.js` into new script files in your
project as these are required. Repeat for any additional service wrappers
(i.e. `s3.js`) as desired.

### Add as a Library

Add the our existing Google Apps Script project as a Library as outlined at
https://developers.google.com/apps-script/guides/libraries

Project key **MUSi7a5HbvN3pxQdnYlZDjhqZNV8Hxu00**

Versions of the Google Apps Script project map to tags on this Git repository.

## Packages

The AWS portion is the only required section. All other files represent shortcut
functions to simplify interactions with that service.

Not all services have been wrapped, nor has every function within the service
API been implemented as a function.

### AWS

Generic wrapper for API requests to Amazon Web Services that should be
compatible with all AWS services as follows:

1. Initialize AWS variable using `AWS.init` passing access and secret keys.

2. Use `AWS.request` with whichever AWS API request you need. Consult AWS
documentation to ensure headers and parameters are passed correctly. This
function only sets up the `Host`, `X-Amz-Date`, `X-Amz-Target`, and
`Authorization` headers by default.

**Note:** `X-Amz-Target` is (as far as I know) only used in POST requests and it
is set to the `action` parameter provided by default.

**Command usage:**
```
AWS.request(
  service,
  region,
  action,
  params={},
  method='GET',
  payload='',
  headers={},
  uri='/'
);
```

**Example:**
```
function myFunction() {
  AWS.init("MY_ACCESS_KEY", "MY_SECRET_KEY");
  var responseXML = AWS.request(
    'ec2',
    'us-east-1',
    'DescribeInstances',
    { "Version":"2015-10-01" }
  );
  ...
}
```

### S3

Initialize the S3 variable using `S3.init` similar to how AWS variable is
described above.

Functions implemented so far:

* listAllMyBuckets()
* getObject(bucketName, objectName, region)
* putObject(bucketName, objectName, object, region)
* deleteObject(bucketName, objectName, region)
