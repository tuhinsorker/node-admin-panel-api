const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");
const productModel = require("../models/productModel");
const fs = require('fs');
const path = require('path');

const createProduct = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = {};
        errors.array().forEach((err) => {
            formattedErrors[err.path] = err.msg;
        });
        return errorResponse(res, "Validation error", formattedErrors, 400);
    }


    try {
        const { name, price, status } = req.body;
        const image = req.file ? req.file.filename : null;

        // console.log('Creating product with data:', { name, price, status, image });
        
        productModel.createProduct(
            [ name, price, status, image ],
            (err,result) =>{
                if (err) return next(err);
                return successResponse(
                    res,
                    { id: result.insertId, image },
                    "Product created",
                    201,
                );
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const statusFilter = req.query.status || 1;

    console.log('Query Params:', { page, limit, search, statusFilter });

    const offset = (page - 1) * limit;

    productModel.allProducts(
        {page, limit, offset, search, statusFilter},
        (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return successResponse(res,{
            products: results,
            page,
            limit,
            total: results.length
        }, 'List of products');
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    productModel.findProductById(id, (err, result) => {
        if (err) {
            return errorResponse(res, "Database error", error.message, 500);
        }
        if (result.length === 0) {
            return errorResponse(res, "Product not found", `No product with ID ${id}`, 404);
        }
        
        console.log(result[0]);
        return successResponse(res, result[0], `Product details for ID ${id}`);
    });
};

const updateProduct = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const formattedErrors = {};
        errors.array().forEach((err) => {
            formattedErrors[err.path] = err.msg;
        });
        return errorResponse(res, "Validation error", formattedErrors, 400);
    }
    try {
        const { id } = req.params;
        const { name, price, status } = req.body;
        const image = req.file ? req.file.filename : null;

        productModel.findProductById(id, (err, result) => {
            if (err) {
                return errorResponse(res, "Database error", error.message, 500);
            }
            if (result.length === 0) {
                return errorResponse(res, "Product not found", `No product with ID ${id}`, 404);
            }

            if (image && result[0].image) {
                const oldImagePath = path.join(__dirname, '../uploads/', result[0].image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }
        });

        const finalImage = image || oldImagePath; // Keep existing image if no new one is uploaded

        
        productModel.updateProduct(
            [ name, price, status, finalImage, id ],
            (err,result) =>{
                if (err) return next(err);
                if (result.affectedRows === 0) {
                    return errorResponse(res, "Product not found", `No product with ID ${id}`, 404);
                }
                return successResponse(
                    res,
                    null,
                    `Product with ID ${id} updated`,
                );
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};
   
const deleteProduct = (req, res, next) => {
    const { id } = req.params;
    try {
        productModel.deleteProduct(
            id,
            (err,result) =>{
                if (err) return next(err);
                if (result.affectedRows === 0) {
                    return errorResponse(res, "Delete Error", err.message, 500);
                }
                return successResponse(
                    res,
                    null,
                    `Product with ID ${id} deleted`,
                );
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};