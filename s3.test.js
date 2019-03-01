// Set the following to values that make sense for testing
var access_key = "";
var secret_key = "";
var bucket_name = "";
var region = "";
var name_of_object_that_exists = ""; // do NOT include leading slash
var name_of_object_that_does_not_exist = ""; // do NOT include leading slash
var name_of_file_create = ""; // do NOT include leading slash

// Initialize connection:
// S3.init(access_key, secret_key);

function testS3() {
  testS3ListAllBuckets();
  testS3GetObjectExists();
  testS3GetObjectNotExist();
  testS3PutObject();
  testS3DeleteObject();
}

function testS3ListAllBuckets() {
  try {
    S3.init(access_key, secret_key);
    var result = S3.listAllMyBuckets();
    Logger.log("testS3ListAllBuckets - Result:");
    Logger.log(result);
    Logger.log("testS3ListAllBuckets - PASS");
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3ListAllBuckets - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}

function testS3GetObjectExists() {
  try {
    S3.init(access_key, secret_key);
    var contents = S3.getObject(bucket_name, name_of_object_that_exists, region);
    if (contents == "file") {
      Logger.log("testS3GetObjectExists - PASS");
    } else {
      Logger.log("testS3GetObjectExists - FAIL - contents [" + contents + "] did not match expected result");
    }
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3GetObjectExists - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}

function testS3GetObjectNotExist() {
  try {
    S3.init(access_key, secret_key);
    S3.getObject(bucket_name, name_of_object_that_does_not_exist, region);
    Logger.log("testS3GetObjectNotExist - FAIL - exception should have been thrown");
  } catch(e) {
    var message = e.toString();
    if (message == "AWS Error - NoSuchKey: The specified key does not exist.") {
      Logger.log("testS3GetObjectNotExist - PASS");
    } else {
      Logger.log("testS3GetObjectNotExist - FAIL - unexpected message [" + message + "]");
      Logger.log(e);
    }
  }
}

function testS3PutObject() {
  try {
    S3.init(access_key, secret_key);
    S3.putObject(bucket_name, name_of_file_create, { "data": "contents" }, region);
    Logger.log("testS3PutObject - PASS");
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3PutObject - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}

function testS3DeleteObject() {
  try {
    S3.init(access_key, secret_key);
    S3.deleteObject(bucket_name, name_of_file_create, region);
    Logger.log("testS3DeleteObject - PASS");
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3DeleteObject - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}
