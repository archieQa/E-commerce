//is used to Get products and post Products
import type { NextApiRequest ,NextApiResponse } from "next";
import Product from '../../../src/models/ProductModel';
import dbConnect from '../../../src/lib/db'; 

// Connection to Db 
dbConnect(); 

//Route handler

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req; 

    // so switch checks if method is actually a GET so it continues the below code 
    switch(method) {
        case 'GET': 
        try {
            const products = await Product.find({}); // get all products
            res.status(200).json({success: true, data: products})
        } catch(error) {
            res.status(400).json({success: false});
        }
        break;
        case 'POST':
        try {
            const product = await Product.create(req.body);  // We create a new Product
            res.status(201).json({success:true, data: product})
        } catch (error) {
            res.status(400).json({success: false}); 
        }
        break;
        default: 
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`);
    }

}