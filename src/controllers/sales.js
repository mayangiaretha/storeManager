import sales from '../models/sales';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

class SalesController {
  static async getAllSales(req, res) {
    try {
      const allSales = await sales.find();
      return res.status(200).json(allSales);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getASale(req, res) {
    try {
      const { id } = req.params;
      const oneSale = await sales.findOne({ salesId: id });
      if (!oneSale) {
        return res.status(400).json({ message: 'sales id doesnot exist' });
      }
      return res.json({ sale: oneSale });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async postASale(req, res) {
    try {
      const { name } = req.body;
      const postedSale = {
        salesId: uuidv4,
        name,
        createdAt: dayjs().format('DD-MM-YYYY h:mm:ss A'),
      };
      await sales.create(postedSale);
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
