import fsPromises from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfases/IUser";

const read = async (): Promise<IUser[]> => {
  try {
    const pathToFileWithDb = path.join(process.cwd(), "db.txt");
    const data = await fsPromises.readFile(pathToFileWithDb, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Error", e.message);
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFileWithDb = path.join(process.cwd(), "db.txt");
    await fsPromises.writeFile(pathToFileWithDb, JSON.stringify(users));
  } catch (e) {
    console.log("Error", e.message);
  }
};

export { read, write };
