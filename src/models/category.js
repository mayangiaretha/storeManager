import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

let categories = mongoose.model('category', categorySchema);
export default categories;
