import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();


// const db = admin.firestore();
const fcm = admin.messaging();

export const sendToDevice = functions.firestore
    .document("orders/{orderId}").onCreate(async (snapshot) => {
      const order = snapshot.data();
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: "Your order successful",
          body: `Thank you for your order. You order is ${order.status} `,
        },
      };
      return fcm.sendToDevice(order.token, payload);
    }
    );

export const sendToDeviceAgain = functions.firestore
    .document("orders/{orderId}").onUpdate(async (snapshot) => {
      const order = snapshot.after.data();
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: `Your order is ${order.status}`,
          body: "Check you order details.",
        },
      };
      return fcm.sendToDevice(order.token, payload);
    }
    );

