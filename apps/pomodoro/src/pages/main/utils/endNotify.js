import { ID } from "../store";
import notificationPlugins from "@utils/notificationPlugins";

export default function endNotify(params = {}) {
  const { title, text } = params;
  notificationPlugins({
    action: "update",
    params: [
      {
        id: ID,
        androidOngoing: false,
        title: title?? "",
        text: text ?? "",
      },
    ],
  });
}
