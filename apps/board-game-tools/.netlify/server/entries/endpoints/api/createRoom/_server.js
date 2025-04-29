import { j as json } from "../../../../chunks/index2.js";
import { D as DbHandler } from "../../../../chunks/DbHandler.js";
import os from "os";
function getLocalHost() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}
async function GET() {
  const dbHandler = new DbHandler("board_game_tools.sqlite");
  const db = await dbHandler.init();
  const ip = getLocalHost();
  try {
    db.run("INSERT INTO rooms (ip) VALUES (:ip)", {
      ":ip": ip
    });
  } catch (error) {
    console.error(error);
  } finally {
    await dbHandler.endSQL();
  }
  return json({});
}
export {
  GET
};
