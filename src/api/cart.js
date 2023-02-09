import client from "./client";

export const getCartItemsByUser = async () => {
    try {
        const res = await client.get('/user/getCartItemsByUser');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteItemFromCart = async (itemId) => {
    try {
        const res = await client.post('/user/removeItemById',itemId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const addItemToCart = async (itemId,itemQuantity) => {
    try {
        const res = await client.post('/user/addItemById',itemId,itemQuantity);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};