const cloudinary = require("../../config/cloudinary");
const Product = require("../../model/products");
const Category = require("../../model/category");

exports.adminProductViewGet = async (req, res) => {
  try {
    if (req.session.adminEmail) {
      const currentPage = parseInt(req.query.page) || 1;

      const productsCount = await Product.countDocuments();
      const productsPerPage = 5;

      const skip = (currentPage - 1) * productsPerPage;

      const totalPages = Math.ceil(productsCount / productsPerPage);

      const products = await Product.find()
        .populate("category")
        .skip(skip)
        .limit(productsPerPage);
      res.render("admin_product_view", {
        product: products,
        currentPage,
        totalPages,
      });
    } else {
      res.render("admin_login");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.adminProductAddGet = async (req, res) => {
  try {
    if (req.session.adminEmail) {
      const category = await Category.find();
      res.render("admin_product_add", { category: category });
    } else {
      res.render("admin_login");
    }
  } catch (err) {}
};

exports.adminProductAddPost = async (req, res) => {
  const valid = validationProduct(req.body, req.files);

  try {
    if (!valid.isValid) {
      const error = new Error();
      error.code = 400;
      error.errors = valid.errors;
      throw error;
    }
    const files = req.files;
    const productImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "Products",
      });

      const image = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      productImages.push(image);
    }

    const { name, description, price, stock, category } = req.body;
    const product = new Product({
      name: name,
      description: description,
      stock: stock,
      price: price,
      category: category,
      imageUrl: productImages,
    });
    if (valid.isValid) {
      await product.save();
      return res.status(200).end();
    } else {
      return res.status(400).json({ error: valid.errors });
    }
  } catch (err) {
    if (err.code === 400) {
      return res.status(400).json({ error: err.errors });
    }
  }
};

exports.adminProductEditGet = async (req, res) => {
  try {
    // if (req.session.adminEmail) {
      const id = req.params.product_id;
      const product = await Product.findById(id).populate("category");
      const category = await Category.find();
      res.render("admin_product_edit", {
        product: product,
        category: category,
      });
    // } else {
      // res.render("admin_login");
    // }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.adminProductEditPost = async (req, res) => {
  try {
    // if (req.session.adminEmail) {
      const id = req.params.product_id;
      const { name, description, price, stock, category, selectedImages } = req.body;
      const files = req.files;
      const existingProduct = await Product.findById(id);

      if(selectedImages && selectedImages.length > 0){
        existingProduct.imageUrl.forEach(image => {
          if (selectedImages.includes(image.url)) {
            image.isVisible = true; 
          } else {
            image.isVisible = false;
          }
        })
      }

      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.price = price;
        existingProduct.stock = stock;
        existingProduct.category = category;
        if (files) {
          for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: "Product",
            });

            existingProduct.imageUrl.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        }
        await existingProduct.save();
        res.status(200).end();
      } else {
        res.status(404).send("Product not found");
      }
    // }
  } catch (err) {
    console.log(err);
    console.log(err.stack);
    res.status(500).send(err.toString());
  }
};

exports.adminproductImageAlterPost = async (req, res) => {
  try{
    const selectedImageId = req.query.imageUrl;
    const isChecked = req.body.checked;
    // console.log(isChecked);
    // console.log(selectedImageId);
    // console.log(typeof(selectedImageId));
    // const existingProduct = await Product.findOne(
    //   { "imageUrl.url": selectedImageId },
    //   { "imageUrl.$": 1 }
    // );

    // if(isChecked){
    //   existingProduct
    // }
    // console.log(existingProduct); 
    const existingProduct = await Product.findOne({ "imageUrl.url": selectedImageId });
    const imageToUpdate = existingProduct.imageUrl.find(image => image.url === selectedImageId);
    if(isChecked){
      imageToUpdate.isVisible = false;
    } else {
      imageToUpdate.isVisible = true;
    }
    await existingProduct.save();
    console.log(existingProduct);
  }catch(err){
    console.log(10)
    console.log(err);
  }
}

function validationProduct(data, files) {
  const errors = {};
  if (!files) {
    errors.productImageError = "Please provide an image";
    errors.productImageError2 = "Please provide an image";
    errors.productImageError3 = "Please provide an image";
    errors.productImageError4 = "Please provide an image";
  }
  const { name, description, price, stock, category } = data;
  const nameRegex = /^[A-Za-z\s]+$/;
  const priceRegex = /^\d+(\.\d+)?$/;

  if (!name) {
    errors.productNameError = "Please add product name";
  } else if (!nameRegex.test(name)) {
    errors.productNameError = "The name should only include alphabets";
  }

  if (!description) {
    errors.productDescriptionError = "Please add product description";
  }

  if (!price) {
    errors.productPriceError = "Please provide a price for product";
  } else if (!priceRegex.test(price)) {
    errors.productPriceError = "Provide a valid Price for the product";
  }

  if (!stock) {
    errors.productStockError = "Please provide stock";
  } else if (!priceRegex.test(stock)) {
    errors.productStockError = "Please provide a valid stock for the product";
  }

  if (!category) {
    errors.categoryError = "Please select a category";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
