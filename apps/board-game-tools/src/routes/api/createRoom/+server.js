import { json } from "@sveltejs/kit";
import DbHandler from "$lib/server/DbHandler.js";
import getHostAddress from "$lib/server/getHostAddress.js";

export async function GET() {
  let result = {};

  try {
    const dbHandler = new DbHandler("board_game_tools.sqlite");
    const db = await dbHandler.init();
    const ip = getHostAddress();
    try {
      db.run("INSERT INTO rooms (ip) VALUES (:ip)", {
        ":ip": ip,
      });
    } catch (error) {
      console.error(error);
      result = { error };
    } finally {
      await dbHandler.endSQL();
    }
  } catch (error) {
    console.error(error);
    result = { error };
  }
  return json(result);
}
