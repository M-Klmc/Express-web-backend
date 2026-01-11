import mongoose from 'mongoose'; 

const dbURI = process.env.DBURI || 'mongodb://admin:14042005Ksy@127.0.0.1:27017';
const dbName = process.env.DBNAME || 'todos'; 


const connectionString = `${dbURI}/${dbName}?authSource=admin`;

let Todo, User;

export async function connectToDB() {
    
    await mongoose.connect(connectionString);
    
    
    Todo = mongoose.model('Todo', scTodo) || mongoose.models.Todo;
    User = mongoose.model('User', scUser) || mongoose.models.User;
    
    console.log('MongoDB connected with authentication');
}


export { Todo, User };


const scTodo = new mongoose.Schema({
    title: String,
    desc: String,
    addendum: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    done: {
        type: Boolean,
        default: false
    }, 
    createdAt: {
        type: Date,
        index: true,
        default: () => new Date()
    }
}, {
    versionKey: false,
    statics: {
        async findOneAndSetDone(id, user) {
            const todo = await this.findOne({ _id: id, user: user });
            if (todo) await todo.markAsDone();
            return todo;
        },
        query: {
            contains(val) {
                return this.or([
                    { title: new RegExp(val, 'i') },
                    { desc: new RegExp(val, 'i') }
                ]);
            }
        }
    }
});

scTodo.index({done: 1, createdAt: 1});
scTodo.method('markAsDone', async function () {
    this.done = true;
    await this.save();
});

const scUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: Buffer,
        required: true
    }, 
    salt: {
        type: Buffer,
        required: true
    }
}, {
    versionKey: false
});