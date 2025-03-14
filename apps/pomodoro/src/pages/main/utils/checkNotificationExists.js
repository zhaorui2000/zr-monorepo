import { ID } from "../store";
import notificationPlugins from "@utils/notificationPlugins";

export default async function checkNotificationExists() {
    return new Promise((resolve) => {
      notificationPlugins({
        action: "get",
        params: [
          ID,
          (notifications) => {
            resolve(
              Object.prototype.toString.call(notifications) ===
                "[object Object]"
            );
          },
        ],
      });
    });
  }