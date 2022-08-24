import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  salesId: {
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
  updatedAt: {
    type: String,
    required: false,
  },
});

let sales = mongoose.model('sale', productSchema);
export default sales;
