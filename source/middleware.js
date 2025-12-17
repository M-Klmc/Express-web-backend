import { matchedData, validationResult } from "express-validator";  
import { User } from "./models/__loaddatabase.js";

import { verifyPromisified } from "./utility.js";
import { getUser } from "./models/users.js";

export  function handleErrors(req, res, next) {
    const r = validationResult(req);
    if(!r.isEmpty() || req.errObj) {
        const t = {
            ...r.mapped(),
            ...req.errObj
        };
        res.status(406);
        res.json({ errors: t });
    } else {
        req.body = matchedData(req);
        next();
    }
}


export async function loadCurrentUser(req, res, next) {
    const auth = req.get('Authorization');
    if (auth) {
        const reToken = /Bearer (.*)/;
        const r = reToken.exec(auth);
        if (r) {
            const secret = process.env.SECRETKEY;
            const token = r[1];
            try {
                const  { name } = await verifyPromisified(token, secret);

                req.user = await getUser(name);
            } catch(exc) { 
                ;
            }
        }
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.user)
        res.redirect('/');
    else
        next();
}

export function isLoggedIn(req, res, next) {
    if(req.user) {
        res.status(403);
        res.end();
    } else
        next();
}

