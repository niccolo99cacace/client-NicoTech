import client from "./client";

export const getItems = async () => {
    try {
        const res = await client.get('/item/home');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getItemById = async (itemId) => {
    try {
        const res = await client.post('/item/getItemById',itemId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};