import db from '../db';
import * as params from './params';

/*
 * This gets called every time a user logs in. If the
 * account is already in our db, update it, otherwise
 * create it.
 */
export async function updateAccount(user) {
    try {
        // Check to see if the user is already in the
        // table. If so, update it.
        const getParams = params.getAccountParams(user.email);
        const record = await db.get(getParams);
        if (!record || !record.Item) {
            // create the user record
            const addParams = params.addAccountParams(user);
            await db.put(addParams);
            Promise.resolve(true);
        }
        else {
            // update the user record
            const updateParams = params.updateAccountParams(user);
            await db.update(updateParams);
            Promise.resolve(true);
        }
    }
    catch (error) {
        console.error(error);
        Promise.resolve(false);
    }
};
