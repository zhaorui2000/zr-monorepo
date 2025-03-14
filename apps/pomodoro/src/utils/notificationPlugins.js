export default (() => {
  let hasPermission = false
  return function ({action,params=[]}) {
    if (!hasPermission) {
      cordova.plugins.notification.local.hasPermission(function (granted) {
        hasPermission = granted
        if (!granted) {
          cordova.plugins.notification.local.requestPermission(
            function (granted) {
              hasPermission = granted
            }
          );
        }
      })
    }
    cordova.plugins.notification.local[action]?.(...params)
  }
})()