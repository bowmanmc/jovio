// Partition data by the account email address
const pk = (email) => {
    return `ACCOUNT#${email}`;
};

export default pk;
