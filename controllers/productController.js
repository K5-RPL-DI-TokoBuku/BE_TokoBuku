const {product} = require('../models/product');

class ProductController {
  static async createProduct(req, res, next) {
    // Menginisiasi CreateProdut
    console.log('post product')
    console.log(req.body.name)
    let { name, author, category, image_link, price, quantity, description } = req.body  // nama, penulis, kategori, gambr, harga, jumlah, deskripsi
    let userData = {
      name, author, category, image_link, price, quantity, description
    }

    try {
      // Membuat user data baru ke database dan di inisiasi ke new product 
      const new_product = await product.create(userData);
      // jika berhasil kirim data ke user jika gagal teruskan pesan failed
      if (new_product){
        res.status(201).json({
          status_code: 201,
          message: "Success Create New product", // 
          name,
          author,
          category,
          image_link,
          price,
          quantity,
          description
        })
      } else {
        throw { name: "Failed Create Product"}
      }
      

    } catch (err) {
      next(err)
    }
  }

  static async readProducts(req, res, next) {
    try {
      const dataProduct = await product.find({})
      if (dataProduct) {        
        res.status(200).json({
          statuc_code: 200,
          message: "Success get data produucts",
          products: dataProduct,

        });
      } else {
        throw { name: 'Data Products Not Found'}
      }
    } catch (err) {
      next(err)
    }
  }

  static async readDetailProduct(req, res, next) {
    const id = req.params.id


    try {
// Mencari product Id ke database lalu di inisiasi ke product Exist
      const productExist = await product.findById(id)
// Jika berhasil kirim data json ke user jika gagal teruskan pesan error
      if (productExist) {
        res.status(200).json({
          status_code: 200,
          message: "Success get detail product",
          data: productExist
        })
      } else {
        throw { name: 'Failed get data product'}
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateProduct(req, res, next) {
    const id = req.params.id
    let { name, author, category, image_link, price, quantity, description } = req.body
    const update = await product.findOneAndUpdate(id, { name, author, category, image_link, price, quantity, description })
    if (update ){
      res.status(200).json({
        message: "Success Update"
      })
    } else {
      res.status(200).json({
        message: "Update Failed"
      })
    }
    
    
  }
  
  static async deleteProduct(req, res, next) {
    const id = req.params.id
    console.log(id)

    try {
// Mencari product Id dan Delete ke database lalu di inisiasi ke product Exist
      const productExist = await product.findByIdAndDelete(id)
      console.log(productExist)
// Jika berhasil kirim data json ke user jika gagal teruskan pesan error
      if (productExist) {
       
        res.status(200).json({
          message: "Success Delete",    
          data: productExist
        })
      } else {
        throw { name: 'Failed delete data product'}
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController;



























// const dataProduct = [
    //   {
    //     name: "Codeigniter Basic",
    //     author: "Ir Yuniar Supardi dan Ading Hermawan",
    //     category: "Web Developer",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    //   {
    //     name: "Jaringan Komputer Dengan TCP/IP",
    //     author: "Winarno Sugeng dan Theta Dinnarwaty Putri",
    //     category: "Cyber Security",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    //   {
    //     name: "Certified Ethical hacker 100% illegal",
    //     author: "Jasakom",
    //     category: "Cyber Security",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    //   {
    //     name: "Certified Ethical hacker 400% illegal",
    //     author: "Jasakom",
    //     category: "Cyber Security",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    //   {
    //     name: "Fundamental Of Python For Machine Learning",
    //     author: "Teguh Wahyono",
    //     category: "Machine Learning",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    //   {
    //     name: "Kungfu Hacking dengan NMAP",
    //     author: "Mr. Doel",
    //     category: "Cyber Security",
    //     image_link:
    //       "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //     price: 59000,
    //     quantity: 10,
    //   },
    // ];

        // const product = {
    //   id,
    //   name: "Fundamental Of Python For Machine Learning",
    //   author: "Teguh Wahyono",
    //   category: "Machine Learning",
    //   image_link:
    //     "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //   price: 59000,
    //   quantity: 10,
    // }