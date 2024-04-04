// is used for CRUD apps of the product 
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/db'; // Adjust path as necessary
import Product from '../../../src/models/ProductModel';


dbConnect(); 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query: {id} , method} = req;

    switch (method) {
        case "GET": 
        try {
            const product = await Product.findById(id); // we get the product by id 
            if(!product) {
                res.status(400).json({success: false});
            }
            res.status(200).json({ success: true, data: product });
        } catch (error) {
        res.status(400).json({success: false})    
        }
        break;
        case "PUT": 
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new:true, 
                runValidators: true,
            }) // update the product  
            if (!product) {
                return res.status(404).json({ success: false });
              }
              res.status(201).json({ success: true, data: product });
        } catch (error) {
            res.status(400).json({success: false})  
        }
        break;
        case 'DELETE': 
         try {
            const deletedProduct = await Product.deleteOne({_id: id})
            if (!deletedProduct) {
                return res.status(404).json({ success: false });
            }
            res.status(204).json({ success: true, data: {} });
         } catch (error) {
            res.status(400).json({success: false})  
         }
         break;
         default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}