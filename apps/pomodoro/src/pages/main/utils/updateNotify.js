import { ID } from "../store";
import checkNotificationExists from "./checkNotificationExists";
import startNotify from "./startNotify";
import formatSeconds from "@zr/utils/String/formatSeconds";
import notificationPlugins from "@utils/notificationPlugins";

export default async function updateNotify(value) {
    const exists = await checkNotificationExists();
    if (!exists) {
      startNotify(value);
    }
    notificationPlugins({
      action: "update",
      params: [
        {
          id:ID,
          title: "🍅 倒计时中",
          text: `剩余时间：${formatSeconds(value, "mm:ss")}`,
          androidOngoing: true,
        },
      ],
    });
  }