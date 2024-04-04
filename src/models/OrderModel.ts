import mongoose from 'mongoose';

const  orderItemSchema = new mongoose.Schema({
    productId: (type: mongoose.Schema.Types.ObjectId, required: true ), 
    name: {type: String , required: true},
    quantity: {type: Number, required: true}, 
    price: {type: Number, required: true},
}); 

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    paymentInfo: {
      method: String,
      status: String,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.models.Order || mongoose.model('Order', orderSchema);