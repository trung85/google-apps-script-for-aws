// Set the following to values that make sense for testing
var access_key = "";
var secret_key = "";
var bucket_name = "";
var region = "";
var name_of_object_that_exists = ""; // include leading slash
var name_of_object_that_does_not_exist = ""; // include leading slash

// Initialize connection:
// AWS.init(access_key, secret_key);
//
// Call function:
// AWS.request(service, region, action, params, method, payload, headers, uri);

function testAws() {
  testAwsGetObjectExists();
  testAwsGetObjectNotExist();
}

function testAwsGetObjectExists() {
  AWS.init(access_key, secret_key);
  try {
    var contents = AWS.request("s3", region, "GetObject", undefined, "GET", undefined, undefined, name_of_object_that_exists, { "Bucket": bucket_name });
    if (contents == "file") {
      Logger.log("testAwsGetObjectExists - PASS");
    } else {
      Logger.log("testAwsGetObjectExists - FAIL - contents [" + contents + "] did not match expected result");
    }
  } catch(e) {
    var message = e.toString();
    Logger.log("testAwsGetObjectExists - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}

function testAwsGetObjectNotExist() {
  AWS.init(access_key, secret_key);
  try {
    AWS.request("s3", region, "GetObject", undefined, "GET", undefined, undefined, name_of_object_that_does_not_exist, { "Bucket": bucket_name });
    Logger.log("testAwsGetObjectNotExist - FAIL - exception should have been thrown");
  } catch(e) {
    var message = e.toString();
    if (message == "AWS Error - NoSuchKey: The specified key does not exist.") {
      Logger.log("testAwsGetObjectNotExist - PASS");
    } else {
      Logger.log("testAwsGetObjectNotExist - FAIL - unexpected message [" + message + "]");
      Logger.log(e);
    }
  }
}
