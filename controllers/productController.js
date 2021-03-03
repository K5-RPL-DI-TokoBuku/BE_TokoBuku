class ProductController {
  static async createProduct(req, res, next) {
    // Mesti ada header
    let { name, author, category, image_link, price, quantity } = req.body
    try {
      if (name && category && image_link && price && quantity) {
        res.status(201).json({
          status_code: 201,
          message: "Success Create New product",
          name,
          author,
          category,
          image_link,
          price,
          quantity,
          like: 0,
          dislike: 0,
        })
      } else {
        throw { name: "Failed Create Product"}
      }
    } catch (err) {
      next(err)
    }
  }
  static async readProducts(req, res, next) {
    const dataProduct = [
      {
        name: "Codeigniter Basic",
        author: "Ir Yuniar Supardi dan Ading Hermawan",
        category: "Web Developer",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
      {
        name: "Jaringan Komputer Dengan TCP/IP",
        author: "Winarno Sugeng dan Theta Dinnarwaty Putri",
        category: "Cyber Security",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
      {
        name: "Certified Ethical hacker 100% illegal",
        author: "Jasakom",
        category: "Cyber Security",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
      {
        name: "Certified Ethical hacker 400% illegal",
        author: "Jasakom",
        category: "Cyber Security",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
      {
        name: "Fundamental Of Python For Machine Learning",
        author: "Teguh Wahyono",
        category: "Machine Learning",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
      {
        name: "Kungfu Hacking dengan NMAP",
        author: "Mr. Doel",
        category: "Cyber Security",
        image_link:
          "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 59000,
        quantity: 10,
      },
    ];

    const totalDataProduct = dataProduct.length

    try {
      if (dataProduct) {
        res.status(200).json({
          statuc_code: 200,
          total: totalDataProduct,
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
    const product = {
      id,
      name: "Fundamental Of Python For Machine Learning",
      author: "Teguh Wahyono",
      category: "Machine Learning",
      image_link:
        "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: 59000,
      quantity: 10,
    }

    try {
      if (product) {
        res.status(200).json({
          status_code: 200,
          message: "Success get data product",
          product
        })
      } else {
        throw { name: 'Failed get data product'}
      }
    } catch (err) {
      next(err)
    }
  }
  // static async updateProduct(req, res, next) {}
  // static async deleteProduct(req, res, next) {}
}

module.exports = ProductController;
