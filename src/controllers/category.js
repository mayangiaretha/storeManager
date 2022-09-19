import categories from '../models/category';
import { v4 as uuidv4 } from 'uuid';
class CategoryController {
  static async getAllCategory(req, res) {
    try {
      const allCategories = await categories.find();
      return res.status(200).json(allCategories);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getACategory(res, req) {
    try {
      const { id } = req.params;
      const oneCategory = await categories.findOne({ categoryId: id });
      if (!oneCategory) {
        return res.status(400).json({ message: 'category id doesnt exist' });
      }
      return res.json({ category: oneCategory });
    } catch (error) {
      console.log(error.message);
    }
  }
  static async addCategory(req, res) {
    try {
      const { categoryName } = req.body;

      const foundCategory = await categories.findOne({ categoryName });
      if (foundCategory) {
        return res.status(400).json({ error: 'category already exists' });
      }

      const newCategory = {
        categoryName,
        categoryId: uuidv4(),
      };

      await categories.create(newCategory);
      return res.status(201).json({
        newCategory,
        message: 'category data',
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default CategoryController;
