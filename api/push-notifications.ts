import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { errorActions } from "../../state/error";
import { DeviceSubscription } from "../auth";
import store from "../../state/store";
import { clientInfoOperations } from "../../state/clientInfo";
import { publicInfoOperations } from "../../state/publicInfo";
import { GetDeviceFingerprint } from "../../state/cuser/operations";
import * as client from "./client";
import { cuserActions } from "../../state/cuser";
import { isMobile } from "react-device-detect";
import { sosButtonActions } from "../../state/sos-button";
import { notificationActions, ReportToast } from "../../state/notification";
import { getFirebaseConfig } from '../../utils/firebaseConfig';
import { ReportNotificationData } from '../reports';

const initializeFCM = firebase.initializeApp(getFirebaseConfig(process.env.REACT_APP_ARCTURUS_ENV!));

let messaging: firebase.messaging.Messaging;

if (firebase.messaging.isSupported()) {
    messaging = initializeFCM.messaging();

    messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
            console.log('[Messaging] Refreshing FCM Token.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.

            GetDeviceFingerprint().then((fingerprint) => {
                if (!fingerprint) {
                    console.error("[Messaging] Could not get device fingerprint.");
                    store.dispatch(errorActions.openError("Issue recognizing this device while refreshing subscription. Please try again."));
                    return;
                }

                const subscription: DeviceSubscription = {
                    "token": refreshedToken,
                    "device_type": (isMobile) ? "Mobile" : "Web",
                    "device_fingerprint": fingerprint
                };

                client
                    .updateSubscription(refreshedToken, fingerprint)
                    .then(() => {
                        store.dispatch(cuserActions.updateDeviceSubscription(subscription));
                    })
                    .catch((err) => {
                        console.error("[Messaging] Could not update FCM subscription: ", err);
                        store.dispatch(errorActions.openError("Error refreshing real-time listener subscription. Please restart the application."));
                    });
            });

        }).catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
            store.dispatch(errorActions.openError("Notifications subscription interrupted. Please restart the application."));
        });
    });

    /**
     * Handle messages when app is in the foreground
     */
    messaging.onMessage((payload) => {
        console.log("on Message: ", payload);

        if (payload.data) {
            const notificationData: ReportNotificationData = payload.data;

            handleForegroundNotification(notificationData);

        } else {
            console.error("Empty Notification, no data field: " + payload);
        }


    });

}

export const handleForegroundNotification = (notificationData: ReportNotificationData) => {

    if (notificationData) {
        switch(notificationData.type) {
            case "Alert":
            case "Alert-Update":
                console.log("We got an alert!");
                appendToSOSNotificationList(notificationData.id);
                store.dispatch(clientInfoOperations.fetchClientInfo());
                break;
            case "Alert-Confirm":
                console.log("Your alert was confirmed!");
                // TODO toast here
                store.dispatch(notificationActions.openConfirmationNotification())
                // @ts-ignore incorrect typing for operations that return promises TODO SB-187
                // store.dispatch(clientInfoOperations.fetchClientInfo()).then(() => {
                store.dispatch(sosButtonActions.cancelSOS());
                // });
                store.dispatch(clientInfoOperations.fetchClientInfo());
                break;
            case "Alert-Cancel":
                console.log("An alert was cancelled!");
                // TODO toast here
                store.dispatch(notificationActions.openCancelNotification());
                store.dispatch(clientInfoOperations.fetchClientInfo());
                break;
            case "Quick":
                console.log("Client report here!");
                // @ts-ignore incorrect typing for operations that return promises TODO SB-187
                store.dispatch(clientInfoOperations.fetchClientInfo()).then(() => {
                    console.log("Fetched client info again...");
                    const reportData = store.getState().clientInfo.reports.find(report => "" + report.id === notificationData.id)
                    if(reportData){
                        const toast : ReportToast = {
                            report: reportData,
                            report_type: "Quick"
                        };
                        store.dispatch(notificationActions.openReportNotification(toast));
                    }
                });
                break;
            case "Public":
                console.log("Public report added!");
                // @ts-ignore incorrect typing for operations that return promises TODO SB-187
                store.dispatch(publicInfoOperations.fetchPublicReportsFromContainer()).then(() => {
                    console.log("we fetched those public reports this time");
                    const reportData = store.getState().publicInfo.reports.find(report => "" + report.id === notificationData.id)
                    if(reportData){
                        const toast : ReportToast = {
                            report: reportData,
                            report_type: "Public"
                        };
                        store.dispatch(notificationActions.openReportNotification(toast));
                    }
                });
                break;
        }
    }

};

/**
 * Some alerts notifications will be sent by Jarvis under conditions that we can't take into account in the client
 * i.e. if an alert occurs from a member of another team, but the alert is still within 10km of the current user
 *
 * Therefore we'll track all alert_ids in LocalStorage so we can check for this cases as well when deciding which alerts to show
 *
 * @param alert_id_string: string version of alert id sent with notification
 */
const appendToSOSNotificationList = (alert_id_string: string) => {

    const sosList = localStorage.getItem("sosNotificationsList");
    if (sosList) {
        const sosIdArray = JSON.parse(sosList);
        sosIdArray.push(Number(alert_id_string));
        localStorage.setItem("sosNotificationsList", JSON.stringify(sosIdArray));
    } else {
        const sosIdArray = [Number(alert_id_string)];
        localStorage.setItem("sosNotificationsList", JSON.stringify(sosIdArray));
    }

};

export { messaging }
