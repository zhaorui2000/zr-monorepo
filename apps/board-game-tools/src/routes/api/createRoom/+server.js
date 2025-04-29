import { json } from "@sveltejs/kit";
import DbHandler from "$lib/server/DbHandler.js";
import getHostAddress from "$lib/server/getHostAddress.js";

export async function GET() {
  const dbHandler = new DbHandler("board_game_tools.sqlite");
  const db = await dbHandler.init();
  const ip = getHostAddress();
  console.log(ip);
  try {
    db.run("INSERT INTO rooms (ip) VALUES (:ip)", {
      ":ip": ip,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await dbHandler.endSQL();
  }
  return json({});
}
