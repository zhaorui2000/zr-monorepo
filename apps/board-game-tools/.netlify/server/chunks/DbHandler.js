import fs from "fs";
import initSqlJs from "sql.js";
class DbHandler {
  #fileName;
  #db;
  constructor(file) {
    this.#fileName = `./database/${file}`;
  }
  async init() {
    try {
      const fileBuffer = await fs.promises.readFile(this.#fileName).catch(() => new Uint8Array());
      const SQL = await initSqlJs();
      this.#db = new SQL.Database(fileBuffer);
      return this.#db;
    } catch (error) {
      console.error(`数据库初始化失败: ${error.message}`);
      throw error;
    }
  }
  async endSQL() {
    if (!this.#db) {
      console.warn("数据库连接未初始化");
      return;
    }
    try {
      const data = this.#db.export();
      const buffer = Buffer.from(data);
      await fs.promises.writeFile(this.#fileName, buffer);
      this.#db.close();
    } catch (error) {
      console.error(`数据保存失败: ${error.message}`);
      throw error;
    }
  }
}
export {
  DbHandler as D
};
