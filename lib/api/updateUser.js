import DataUtils from './datautils';
import db from './db';


/*
 * This gets called every time a user logs in
 */
export default async function updateUser(user) {
    try {
        // Check to see if the user is already in the
        // table. If so, update it.
        const getParams = DataUtils.getUserParams(user.email);
        const record = await db.get(getParams);
        if (!record || !record.Item) {
            // create the user record
            const addParams = DataUtils.addUserParams(user);
            await db.put(addParams);
            Promise.resolve(true);
        }
        else {
            // update the user record
            const updateParams = DataUtils.updateUserParams(user);
            await db.update(updateParams);
            Promise.resolve(true);
        }
    }
    catch (error) {
        console.error(error);
        Promise.resolve(false);
    }
};
