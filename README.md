# google-apps-script-for-aws

Google Apps Script wrapper for authenticated REST API requests to Amazon Web
Services (AWS).

How to use:

1. Create a new project in Google Scripts -- https://script.google.com

2. Create a new script file and paste the contents of `aws.js` into it and save.

3. Create a second script for project code and configure AWS variable with
`AWS.init`

4. Use `AWS.request` with whichever AWS API request you need. Consult AWS
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
