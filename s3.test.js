// Set the following to values that make sense for testing
function testS3Config_() {
  return {
    "access_key": "",
    "secret_key": "",
    "bucket_name": "",
    "region": "",
    "name_of_object_that_exists": "", // do NOT include leading slash
    "name_of_object_that_does_not_exist": "", // do NOT include leading slash
    "name_of_file_create": "" // do NOT include leading slash
  }
}

// Initialize connection:
// S3.init(access_key, secret_key);

function testS3_() {
  testS3ListAllBuckets_();
  testS3GetObjectExists_();
  testS3GetObjectNotExist_();
  testS3PutObject_();
  testS3DeleteObject_();
}

function testS3ListAllBuckets_() {
  var config = testS3Config_();
  try {
    S3.init(config.access_key, config.secret_key);
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

function testS3GetObjectExists_() {
  var config = testS3Config_();
  try {
    S3.init(config.access_key, config.secret_key);
    var contents = S3.getObject(config.bucket_name, config.name_of_object_that_exists, config.region);
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

function testS3GetObjectNotExist_() {
  var config = testS3Config_();
  try {
    S3.init(config.access_key, config.secret_key);
    S3.getObject(config.bucket_name, config.name_of_object_that_does_not_exist, config.region);
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

function testS3PutObject_() {
  var config = testS3Config_();
  try {
    S3.init(config.access_key, config.secret_key);
    S3.putObject(config.bucket_name, config.name_of_file_create, { "data": "contents" }, config.region);
    Logger.log("testS3PutObject - PASS");
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3PutObject - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}

function testS3DeleteObject_() {
  var config = testS3Config_();
  try {
    S3.init(config.access_key, config.secret_key);
    S3.deleteObject(config.bucket_name, config.name_of_file_create, config.region);
    Logger.log("testS3DeleteObject - PASS");
  } catch(e) {
    var message = e.toString();
    Logger.log("testS3DeleteObject - FAIL - unexpected message [" + message + "]");
    Logger.log(e);
  }
}
