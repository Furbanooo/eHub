import { Product } from "..models/allModels.js";

const dynamicProduct = async function (next) {
    try {
        // Determine the source of the product details (SwapOffer or SellRequest)
        const productDetails = this.productOffered?.productDetails || this.productDetails;

        if (!productDetails) {
            return next(new Error("Product details are required"));
        }

        const { name, brand, model, condition, images, additionalDetails } = productDetails;
        const brandExist = await Brand.findOne({ name: brand });

        if (!brandExist) {
            return next(new Error("Invalid brand name"));
        }
        let existingProduct = await Product.findOne({
            name,
            brand: brandExist._id, // reference to the brand in the database
            model
        });

        if (existingProduct) {
            // Product already exists in inventory
            if (this.productOffered) { // If it's a SwapOffer
                this.productOffered.productId = existingProduct._id;
            } else { // If it's a SellRequest
                this.productId = existingProduct._id;
            }
        } else {
            // Create a new product
            const newProduct = new Product({
                name,
                brand: brandExist._id,
                model,
                condition,
                images,
                additionalDetails
                // ... (add any other required fields for your Product model)
            });
            const savedProduct = await newProduct.save();
            if (this.productOffered) {
                this.productOffered.productId = savedProduct._id;
            } else {
                this.productId = savedProduct._id;
            }
        }

    } catch (error) {
        console.error("Error in dynamicProduct middleware:", error);
        return next(error);
    }

    next();
};

export default dynamicProduct;


//will to be teken care ooooffffff