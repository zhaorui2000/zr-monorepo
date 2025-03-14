import notificationPlugins from "@utils/notificationPlugins";
import { ID } from "../store";
import formatSeconds from "@zr/utils/String/formatSeconds.js";
export default function startNotify(value) {
    notificationPlugins({
      action: "schedule",
      params: [
        {
          id:ID,
          title: "🍅 倒计时中",
          text: `剩余时间：${formatSeconds(value, "mm:ss")}`,
          androidOngoing: true, // 关键设置：使通知不可关闭
        },
      ],
    });
  }