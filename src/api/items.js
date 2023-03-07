import client from "./client";
//per maggiori chiarimenti guarda il codice nell server

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

export const getSearchResults = async (itemName) => {
    try {
        const res = await client.post('/item/getSearchResults',itemName);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getSuggestions = async (itemName) => {
    try {
        const res = await client.post('/item/getSearchResults',itemName);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const getFilteredItems = async (filters) => {
    try {
        const res = await client.post('/item/getFilteredItems',filters);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const getReviewsByItem = async (itemId) => {
    try {
        const res = await client.post('/item/getReviewsByItem',itemId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteItemById = async (itemId) => {
    try {
        const res = await client.post('/item/deleteItemById',itemId);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const updateItemPrice = async (itemIdAndNewPrice) => {
    try {
        const res = await client.post('/item/updateItemPrice',itemIdAndNewPrice);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const updateItemAvailability = async (itemIdAndNewAvailability) => {
    try {
        const res = await client.post('/item/updateItemAvailability',itemIdAndNewAvailability);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};



export const uploadImage1OnCloud = async (formData) => {
    try {

        const res = await client.post('/item/uploadImage1OnCloud',formData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const uploadImage2OnCloud = async (formData) => {
    try {

        const res = await client.post('/item/uploadImage2OnCloud',formData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const uploadImage3OnCloud = async (formData) => {
    try {

        const res = await client.post('/item/uploadImage3OnCloud',formData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};