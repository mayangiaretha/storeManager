import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  updatedAt: {
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
