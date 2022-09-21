import sales from '../models/sales';
import products from '../models/products';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

class SalesController {
  static async getAllSales(req, res) {
    try {
      const allSales = await sales.find().populate({
        path: 'productId',
        model: 'product',
        populate: {
          path: 'categoryId',
          model: 'category',
        },
      });
      return res.status(200).json(allSales);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getASale(req, res) {
    try {
      const { id } = req.params;
      const oneSale = await sales.findOne({ salesId: id }).populate({
        path: 'productId',
        model: 'product',
      });
      if (!oneSale) {
        return res.status(400).json({ message: 'sales id does not exist' });
      }
      return res.json({ sale: oneSale });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async postASale(req, res) {
    try {
      const { productId, quantity } = req.body;

      const productItem = await products.findOne({ productId });
      if (!productItem) {
        return res.status(400).json({ error: 'product does not exist' });
      }

      const { _id, amount, name } = productItem;
      const productQuantity = productItem.quantity;

      if (productQuantity === 0) {
        return res.status(400).json({
          error: `${name} items currently out of stock`,
        });
      }
      const postedSale = {
        salesId: uuidv4(),
        productId: _id,
        quantity,
        total: quantity * amount,
        createdAt: dayjs().format('DD-MM-YYYY h:mm:ss A'),
      };

      postedSale.name = name;

      const quantitySold = postedSale.quantity;
      const unsoldProduct = productQuantity - quantitySold;

      if (unsoldProduct < 0) {
        return res.status(400).json({
          error: `${productQuantity} items currently available, please adjust your request`,
        });
      }

      await sales.create(postedSale);
      await products.findOneAndUpdate(
        { productId },
        { quantity: unsoldProduct }
      );

      return res.status(201).json({
        sale: postedSale,
        message: 'sold',
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default SalesController;
