import models from "../models/models";
import asyncHandler from "express-async-handler";

const makeOder = asyncHandler(async (res, req) => {
    const userId = req.user.id;
    const [{ productId }] = req.product.id; //it can be multiples products
    const { quantity, payementId, address } = req.body;


})