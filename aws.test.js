// Set the following to values that make sense for testing
function testAwsConfig_() {
  return {
    "access_key": "",
    "secret_key": "",
    "bucket_name": "",
    "region": "",
    "name_of_object_that_exists": "", // include leading slash
    "name_of_object_that_does_not_exist": "" // include leading slash
  }
}

// Initialize connection:
// AWS.init(access_key, secret_key);
//
// Call function:
// AWS.request(service, region, action, params, method, payload, headers, uri);

function testAws_() {
  testAwsGetObjectExists_();
  testAwsGetObjectNotExist_();
}

function testAwsGetObjectExists_() {
  var config = testAwsConfig_();
  AWS.init(config.access_key, config.secret_key);
  try {
    var contents = AWS.request("s3", config.region, "GetObject", undefined, "GET", undefined, undefined, config.name_of_object_that_exists, { "Bucket": config.bucket_name });
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

function testAwsGetObjectNotExist_() {
  var config = testAwsConfig_();
  AWS.init(config.access_key, config.secret_key);
  try {
    AWS.request("s3", config.region, "GetObject", undefined, "GET", undefined, undefined, config.name_of_object_that_does_not_exist, { "Bucket": config.bucket_name });
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
