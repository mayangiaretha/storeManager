import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  customer_id: {
    type: String,
    required: false,
  },
});

let products = mongoose.model('product', productSchema);
export default products;
