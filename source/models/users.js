import { User } from "./__loaddatabase.js";

export async function getUser(name) {
    return await User.findOne({ username: name});
}

export async function addUser(user) {
    const oUser = new User(user);
    await oUser.save();
}

export async function removeUser(username) {
    const result = await User.deleteOne({username: username});
    return result.deleteCount > 0;
}