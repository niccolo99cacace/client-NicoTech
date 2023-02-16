import client from "./client";

export const getCartItemsByUser = async () => {
    try {
        const res = await client.get('/user/getCartItemsByUser');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const getCartItemsBySessionCart = async () => {
    try {
        const res = await client.get('/user/getCartItemsBySessionCart');
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

export const addItemSessionCart = async (itemId,itemQuantity) => {
    try {
        const res = await client.post('/user/addItemSessionCart',itemId,itemQuantity);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const getCartItemsNumberByUserId = async () => {
    try {
        const res = await client.get('/user/getCartItemsNumberByUserId');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const getSessionCartItemsNumber = async () => {
    try {
        const res = await client.get('/user/getSessionCartItemsNumber');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};