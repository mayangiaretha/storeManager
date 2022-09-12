import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    }
});

let categories = mongoose.model('category', categorySchema);
export default categories;
