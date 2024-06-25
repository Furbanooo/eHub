import {Product} from "./allModels.js";

const dynamicProduct =function (schema) {

    schema.pre('save', async function (next) {
        const existingProduct = await Product.findOne({
            name: this.productOffered.productDetails.name,
            brand: this.productOffered.productDetails.brand,
            model: this.productOffered.productDetails.model
        });

        if (existingProduct) {
            // Product already exists in inventory
            this.productOffered.productId = existingProduct._id;
        } else {
            // Create a new product
            const newProduct = new Product({
                name: this.productOffered.productDetails.name,
                brand: this.productOffered.productDetails.brand,
                model: this.productOffered.productDetails.model
            });

            await newProduct.save();
            this.productOffered.productId = newProduct._id;
        }

        next();
    });
};

export default dynamicProduct;