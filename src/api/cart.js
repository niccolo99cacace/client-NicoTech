import client from "./client";

export const getCartByUserId = async (userId) => {
    try {
        const res = await client.post('/item/getCartByUserId',userId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};