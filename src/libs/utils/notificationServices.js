import messaging from '@react-native-firebase/messaging'

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
        console.log('Authorization status:', authStatus)
    }
}

// const generateFcmToken = async () => {
//     let fcmToken = await AsyncStorage.getItem("fcmToken")
//     console.log("old token ", fcmToken)

//     if (!fcmToken) {
//         try {
//             let fcmToken = await messaging().getToken()

//             if (fcmToken) {
//                 console.log("new token ", fcmToken)

//                 await AsyncStorage.setItem("fcmToken", fcmToken)
//             }
//         } catch (error) {
//             console.log("error rasied in fcmToken", error)
//         }
//     }
// }

export const notificationListener = () => {
    // Check whether an initial notification is available
    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                )
                navigation.navigate(remoteMessage.data.type)
            }
        })

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging()
        .onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            )
            navigation.navigate(remoteMessage.data.type)
        })

    messaging().onMessage(async remoteMessage => {
        console.log("Received in foreground", remoteMessage)
    })
}

