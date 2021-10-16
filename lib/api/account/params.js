import dayjs from 'dayjs';
import pk from '../pk';


const sk = (email) => {
    return `ACCOUNT#${email}`
};

export const getAccountParams = (email) => {
    return {
        Key: {
            'pk': pk(email),
            'sk': sk(email),
        },
    };
};

export const addAccountParams = (user) => {
    const servertime = dayjs().toISOString();
    return {
        Item: {
            pk: pk(user.email),
            sk: sk(user.email),
            email: user.email,
            name: user.name,
            image: user.image,
            created: servertime,
            updated: servertime,
        },
    };
};

export const updateAccountParams = (email) => {
    const servertime = dayjs().toISOString();
    return {
        Key: {
            'pk': pk(user.email),
            'sk': sk(user.email),
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
};
