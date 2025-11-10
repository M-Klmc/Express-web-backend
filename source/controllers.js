// controllers

import { getList } from "./models/todos.js";
export function mainPage(req, res) {
    const list = getList();

let s = '<doctype html>' +
        '<html>'+
        '    <head>'
        '       <meta charset="UTF-8">' +
        '       <title>To-Do-List</title>'
        '    </head>' +
        '    <body>' +
        '       <h1>To-Do</h1>';
        for (let t of list) {
            const date = new Date (t.createdAt);
s +=    `           <h2><a href="/${t._id}/">${t.title}</a></h2>` +
        `               <p>${t.desc}</p>` +
        `               <p>${date.toLocaleString()}</p>` +
        '               <p>&nbsp</p>';
        }

s +=    '  </body>' +
        '</html>'; 
res.send(s);
}