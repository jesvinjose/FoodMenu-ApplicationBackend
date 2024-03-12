import {
  jsonErrorHandler,
  jsonSuccessHandler,
} from "../helpers/jsonHandler.js";
import { Menu } from "../models/menuSchema.js";


export const createMenu = async (req, res) => {
  try {
    const { category, price, item } = req.body;
    if (
      category !== "Indian" &&
      category !== "Chinese" &&
      category !== "Thai" &&
      category !== "Arabian" &&
      category !== "Shakes & IceCreams"
    ) {
      return res.status(422).json(jsonErrorHandler["error8"]);
    }
    const data = { category, price, item };
    const result = new Menu(data);
    const response = await result.save();
    return res.status(201).json(jsonSuccessHandler["success7"]);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const menuListing = async (req, res) => {
  try {
    const menuList = await Menu.find({});
    return res
      .status(200)
      .json({ menuList, ...jsonSuccessHandler["success8"] });
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { menuId, category, item, price } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(404).json(jsonErrorHandler["error6"]);
    }
    const menuExists = await Menu.findById({ _id: menuId });
    if (!menuExists) {
      return res.status(404).json(jsonErrorHandler["error7"]);
    }
    if (category) {
      menuExists.category = category;
    }
    if (item) {
      menuExists.item = item;
    }
    if (price) {
      menuExists.price = price;
    }
    await menuExists.save();
    return res.status(200).json(jsonSuccessHandler["success6"]);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};
