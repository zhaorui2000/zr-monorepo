import { j as json } from "../../../../chunks/index2.js";
import { D as DbHandler } from "../../../../chunks/DbHandler.js";
async function GET() {
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
export {
  GET
};
