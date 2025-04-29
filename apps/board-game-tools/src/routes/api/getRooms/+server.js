import { json } from "@sveltejs/kit";
import DbHandler from "$lib/server/DbHandler.js";
import getHostAddress from "$lib/server/getHostAddress.js";

export async function GET() {
  const dbHandler = new DbHandler("board_game_tools.sqlite");
  const db = await dbHandler.init();
  let row = [];
  try {
    [row] = db.exec("SELECT ip FROM rooms");
  } catch (error) {
    console.error(error);
  } finally {
    await dbHandler.endSQL();
  }
  return json(row);
}
