import products from '../models/products';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const allProducts = await products.find();
      return res.status(200).json(allProducts);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAProduct(req, res) {
    try {
      const { id } = req.params;
      const oneProduct = await products.findOne({ productId: id });
      if (!oneProduct) {
        return res
          .status(400)
          .json({ message: 'this product does not exist please check id' });
      }
      return res.json({ product: oneProduct });
    } catch (error) {
      console.log(error.message);
    }
  }
  static async createAProduct(req, res) {
    try {
      const { name, aisle } = req.body;
      const createdProduct = {
        productId: uuidv4(),
        name,
        aisle,
        createdAt: dayjs().format('DD-MM-YYYY h:mm:ss A'),
      };
      await products.create(createdProduct);
      return res.status(201).json({
        product: createdProduct,
        message: 'product created',
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async updateAproduct(req, res) {
    try {
      const { id } = req.params;
      const { name, aisle } = req.body;

      await products.findOneAndUpdate(
        { productId: id },
        { name, aisle, updatedAt: dayjs().format('YYYY-MM-DD h:mm:ss A') }
      );
      const updatedProduct = await products.findOne({ productId: id });
      return res
        .status(201)
        .json({ updatedProduct, message: 'A product has been updated' });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteAProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await products.findOne({ productId: id });
      if (!deletedProduct) {
        return res.status(400).json({
          message: 'This product does not exist',
        });
      }
      await deletedProduct.remove();
      return res.status(204).json({});
    } catch (error) {
      console.log(message.error);
    }
  }
}
export default ProductController;
