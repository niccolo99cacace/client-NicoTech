import client from "./client";

export const getCartItemsByUser = async () => {
    try {
        const res = await client.get('/user/getCartItemsByUser');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};