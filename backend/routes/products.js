import express from "express"
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", addProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)


export default router