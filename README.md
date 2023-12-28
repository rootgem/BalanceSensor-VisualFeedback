# BalanceSensor-VisualFeedback

This code was made to visualize an update in the accelerometer value from the MPU6050 sensor in realtime using Firebase realtime database. The deployed version of the code can be seen as a site here: https://prototype-perancangan.web.app/

Reuse of code is possible by reconfiguring the firebase config on `/src/index.js`

## Example data format sent to Firebase Realtime Database:
```
{
  "UsersData": {
    "FirebaseUid": {
      "readings": {
        "1684805798": {
          "accelerometer": {
            "x": "0.58",
            "y": "-0.09",
            "z": "8.49"
          },
          "timestamp": "1684805798"
        },
        "1684805799": {
          "accelerometer": {
            "x": "0.58",
            "y": "-0.10",
            "z": "8.49"
          },
          "timestamp": "1684805799"
        },
        "1684805800": {
          "accelerometer": {
            "x": "0.60",
            "y": "-0.09",
            "z": "8.49"
          },
          "timestamp": "1684805800"
        }, 
}
```
