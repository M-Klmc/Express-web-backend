import { readFileSync } from "node:fs";
import { database, getObjectId, saveDatabase, dataFileName } from "./__loaddatabase.js";

const users = database.users;

export function getUser(name) {
    const dataFile = readFileSync(dataFileName, 'utf-8');
    const currentDatabase = JSON.parse(dataFile);
    return currentDatabase.users.find((el) => el.username === name);

}

export function addUser(user) {
    user._id = getObjectId();
    users.push(user);
    saveDatabase();
}

export function removeUser(userId) {
    const userIndex = users.findIndex((user) => user._id === userId || user.username === userId);
    if(userIndex > -1) {
        users.splice(userIndex, 1);
        saveDatabase()
        return true;
    }
    return false;
}