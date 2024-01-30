import { db } from "../db.js";
import jwt from "jsonwebtoken"

export const getProducts = (req,res)=>{
    const q = req.query.cat 
    ? "SELECT * FROM products WHERE cat=?" 
    : "SELECT * FROM  products";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}


export const getProduct = (req,res)=>{
    const q = 
    "SELECT p.id, `username`, `name`, `desc`, p.img, `cat`, `price` FROM admins u JOIN products p ON u.id=p.aid WHERE p.id = ?"

    db.query(q,[req.params.id], (err,data)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })

}

export const addProduct = (req,res)=>{
    const token = req.cookies.access_token
   if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO products(`name`,`desc`,`img`,`price`,`cat`, `aid`) VALUES (?)"

        const values = [
            req.body.name,
            req.body.desc,
            req.body.img,
            req.body.price,
            req.body.cat,
            userInfo.id,
        ]

        db.query(q,[values], (err, data)=>{
            if (err) return res.status(500).json(err);
            return res.json("Product has been created")
        })
    })
}


export const deleteProduct = (req,res)=>{
   const token = req.cookies.access_token
   if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const productId = req.params.id;
        const q = "DELETE FROM products WHERE `id` = ? AND `aid` = ?";

db.query(q, [productId, userInfo.id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!")

    return res.json("Post has been deleted!")
})

    })
}


export const updateProduct = (req,res)=>{
    const token = req.cookies.access_token
   if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const productId = req.params.id
        const q = "UPDATE products SET `name`=?,`desc`=?,`img`=?,`price`=?,`cat`=? WHERE `id` = ? AND `aid` = ?"

        const values = [
            req.body.name,
            req.body.desc,
            req.body.img,
            req.body.price,
            req.body.cat,
        ]

        db.query(q,[...values, productId, userInfo.id], (err, data)=>{
            if (err) return res.status(500).json(err);
            return res.json("Product has been updated")
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q =
        "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  
      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });
  };