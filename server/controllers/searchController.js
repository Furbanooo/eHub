/* 
I've decided to make a search controller globally instead of in each controller bcause of security reasons(so that i'll allow just anybody to acces what he/she should not). And also bcause it makes things easy for what's coming next, the seart function a made in other controller before this are still live tho (scared of braking something °:) ) 
*/
import models from "../models/models.js";
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const searchDatabase = async (model, searchQuery, page, limit, sort) => {
    try {
        const results = await model.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort);
        return results;
    } catch (error) {
        console.error("Database query failed:", error);
        throw error;
    }
};


const search = asyncHandler(async (req, res) => {
    const { q, page = 1, limit = 10, sort = 'relevance', side = 'store' } = req.query;

    try {
        const searchQuery = {
            $or: [
                { name: { $regex: String(q), $options: 'i' } },
                //{ category: objectId ? objectId : { $regex: String(q), $options: 'i' } },
                { description: { $regex: String(q), $options: 'i' } },
                { brand: { $regex: String(q), $options: 'i' } },
                { title: { $regex: String(q), $options: 'i' } },
                { id: { $regex: String(q), $options: 'i' } }
            ],
        };

        let results = {};
        let totalResults = 0;

        if (side === 'store' || side === 'admin') {
            results.products = await searchDatabase(models.Product, searchQuery, page, limit, sort);
            results.categories = await searchDatabase(models.Category, searchQuery, page, limit, sort);
        }

        if (side === 'admin' || side === 'hub') {
            results.reviews = await searchDatabase(models.Review, searchQuery, page, limit, sort);
            results.ratings = await searchDatabase(models.Rating, searchQuery, page, limit, sort);
            results.ranking = await searchDatabase(models.ProductRanking, searchQuery, page, limit, sort)
        } else if (side === 'admin') {
            results.users = await searchDatabase(models.User, searchQuery, page, limit, sort);
            results.orders = await searchDatabase(models.Order, searchQuery, page, limit, sort);
        }
        console.log(results);
        // Calculate total results
        totalResults = Object.values(results).reduce((acc, result) => acc + result.length, 0);

        res.status(200).json({ results, totalResults });
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

export default search;