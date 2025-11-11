// controllers

import { getList, getItem } from "./models/todos.js";

export function mainPage(req, res) {
        const list = getList();

let s = '<!doctype html>' +
        '<html>'+
        '    <head>'
        '       <meta charset="UTF-8">' +
        '       <title>To-Do-List</title>' +
        '    </head>' +
        '    <body>' +
        '       <h1>To-Do</h1>';
        for (let t of list) {
                const date = new Date (t.createdAt);
s +=    `           <h2><a href="/${t._id}/">${t.title}</a></h2>` +
        `               <p>${t.desc}</p>` +
        `               <p>${date.toLocaleString()}</p>` +
        '               <p>&nbsp;</p>';
        }

s +=    '  </body>' +
        '</html>'; 
res.send(s);
}

        export function detailPage(req, res) {
        const t = getItem(req.params.id);

        if (!t) {
                errorPage(req, res);
                return;
        }
                const date = new Date(t.createdAt);
                res.send('<!doctype html>' +
                '<html>'+
                '    <head>' +
                '       <meta charset="UTF-8">' +
                '       <title>To-Do-List</title>' +
                '    </head>' +
                '    <body>' +
                `       <h1>${t.title}</h1>` +
                `       <p>${t.desc}</p>` +
                `       <p>Created: ${date.toLocaleString()}</p>` +
                '    </body>' +
                '</html>');
        }

function errorPage(req, res) {
        res.status(404).send('<!doctype html>' +
                '<html>'+
                '    <head>' +
                '       <meta charset="UTF-8">' +
                '       <title>ERROR</title>' +
                '    </head>' +
                '    <body>' +
                `       <h1>Error!</h1>` +
                `       <p>This page is not available...</p>` +
                '    </body>' +
                '</html>');
}