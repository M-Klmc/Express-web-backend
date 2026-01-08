import { Todo } from "./__loaddatabase.js";

export async function getList(user, doneAtLast, search) {
    const qTodos = Todo.find({ user: user });
    if (doneAtLast === '1')
        qTodos.sort('done createdAt');
    else 
        qTodos.sort('createdAt');
    if (search)
        qTodos.contains(search);
    return await qTodos;
}

export async function getItem(id, user) {
    return await Todo.findOne({_id: id, user: user});
}

export async function addItem(todo) {
    const oTodo = new Todo(todo);
    await oTodo.save();
}

export async function setDoneItem(id, user) {
    return await Todo.findOneAndSetDone(id, user);
}

export async function deleteItem(id, user) {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: user});
    return deletedTodo !== null;    
}

export async function getMostActiveUsers() {
    const mostActiveAll = await Todo.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        },
        { $unwind: '$userData' },
        {
            $group: {
                _id: '$userData.username',
                cnt: { $sum: 1 }
            }
        },
        { $sort: { cnt: -1 } },
        { $limit: 3 }
    ]);

    const mostActiveDone = await Todo.aggregate([
        { $match: { done: true } },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        },
        { $unwind: '$userData' },
        {
            $group: {
                _id: '$userData.username',
                cnt: { $sum: 1 }
            }
        },
        { $sort: { cnt: -1 } },
        { $limit: 3 }
    ]);

    return [mostActiveAll, mostActiveDone];
}