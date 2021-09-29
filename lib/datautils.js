import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { pictures } from './backgrounds';

const DEFAULT_LIMIT = 100;

const DataUtils = {

    pk: (email) => {
        return `USER#${email}`;
    },

    sk: (email, sortableTimestamp) => {
        return `JOVEY#${email}#${sortableTimestamp || ''}`;
    },

    userSk: (email) => {
        return `ACCOUNT#${email}`;
    },

    id: () => {
        // https://github.com/ai/nanoid
        return nanoid();
    },

    timestamp: () => {
        return dayjs().toISOString();
    },

    // ui
    random: (items) => {
        if (!items || items.length < 1) {
            return null;
        }
        return items[Math.floor(Math.random() * items.length)];
    },

    // ui
    shuffleArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    // ui
    indexInFeed: (feed, id) => {
        for (let i = 0; i < feed.length; i++) {
            if (feed[i].id === id) {
                return i;
            }
        }
        return -1;
    },

    feedParams: (author, limit) => {
        return {
            KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
            ExpressionAttributeValues: {
                ':pk': DataUtils.pk(author),
                ':sk': DataUtils.sk(author),
            },
            ScanIndexForward: false, // sort descending
            Limit: limit || DEFAULT_LIMIT,
        };
    },

    todayParams: (author) => {
        const day = dayjs().format('YYYY-MM-DD'); // localtime
        const filter = DataUtils.sk(author, day);
        const pkVal = DataUtils.pk(author);
        return {
            KeyConditionExpression: 'pk = :pk and begins_with(sk, :filter)',
            ExpressionAttributeValues: {
                ':pk': pkVal,
                ':filter': filter,
            },
            ScanIndexForward: false, // sort descending
            Limit: DEFAULT_LIMIT,
        };
    },

    pinnedParams: (author) => {
        return {
            KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
            FilterExpression: 'isPinned = :isPinned',
            ExpressionAttributeValues: {
                ':pk': DataUtils.pk(author),
                ':sk': DataUtils.sk(author),
                ':isPinned': true,
            },
        };
    },

    findByIdParams: (author, id) => {
        return {
            KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
            FilterExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':pk': DataUtils.pk(author),
                ':sk': DataUtils.sk(author),
                ':id': id,
            },
        };
    },

    addEntryParams: (author, entry, localtime) => {
        const splash = DataUtils.random(pictures);
        const servertime = dayjs().toISOString(); // executes on the server api
        return {
            Item: {
                pk: DataUtils.pk(author),
                sk: DataUtils.sk(author, localtime),
                id: DataUtils.id(),
                author: author,
                entry: entry,
                splash: splash,
                isPublic: false,
                isPinned: false,
                created: servertime,
                updated: servertime,
            },
        };
    },

    updateEntryParams: (entry, updates) => {
        const servertime = dayjs().toISOString(); // executes on the server api
        return {
            Key: {
                'pk': entry.pk,
                'sk': entry.sk,
            },
            UpdateExpression: "set entry = :entry, splash = :splash, isPinned = :isPinned, isPublic = :isPublic, updated = :updated",
            ExpressionAttributeValues: {
                ':entry': updates.entry,
                ':splash': updates.splash,
                ':isPublic': updates.isPublic,
                ':isPinned': updates.isPinned,
                ':updated': servertime,
            },
            ReturnValues: 'UPDATED_NEW',
        };
    },

    getUserParams: (email) => {
        return {
            Key: {
                'pk': DataUtils.pk(email),
                'sk': DataUtils.userSk(email),
            },
        };
    },

    addUserParams: (user) => {
        const servertime = dayjs().toISOString();
        return {
            Item: {
                pk: DataUtils.pk(user.email),
                sk: DataUtils.userSk(user.email),
                email: user.email,
                name: user.name,
                image: user.image,
                created: servertime,
                updated: servertime,
            },
        };
    },

    updateUserParams: (user) => {
        const servertime = dayjs().toISOString();
        return {
            Key: {
                'pk': DataUtils.pk(user.email),
                'sk': DataUtils.userSk(user.email),
            },
            UpdateExpression: "set #name = :name, image = :image, updated = :updated",
            ExpressionAttributeValues: {
                ':name': user.name,
                ':image': user.image,
                ':updated': servertime,
            },
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ReturnValues: 'UPDATED_NEW',
        };
    },
};

export default DataUtils;
