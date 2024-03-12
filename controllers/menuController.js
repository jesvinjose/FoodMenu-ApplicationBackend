import {
  jsonErrorHandler,
  jsonSuccessHandler,
} from "../helpers/jsonHandler.js";
import { isValidCategory } from "../helpers/validations.js";
import { Menu } from "../models/menuSchema.js";


export const createMenu = async (req, res) => {
  try {
    const { category, price, item } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json(jsonErrorHandler["error6"]);
    }
    if (
      category !== "Indian" &&
      category !== "Chinese" &&
      category !== "Thai" &&
      category !== "Arabian" &&
      category !== "Shakes & IceCreams"
    ) {
      return res.status(422).json(jsonErrorHandler["error8"]);
    }
    if(!price){
      return res.status(404).json(jsonErrorHandler["error10"]);
    }
    if(!item){
      return res.status(404).json(jsonErrorHandler["error11"]);
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
    if (!menuId) {
      return res.status(400).json(jsonErrorHandler["error9"]); 
    }
    if (!category && !price) {
      return res.status(400).json(jsonErrorHandler["error12"]);
    }
    const menuExists = await Menu.findById({ _id: menuId });
    if (!menuExists) {
      return res.status(404).json(jsonErrorHandler["error7"]);
    }
    if (category && !isValidCategory(category)) {
      return res.status(422).json(jsonErrorHandler["error8"]); 
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
