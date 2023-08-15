const cloudinary = require("../../config/cloudinary");
const Category = require("../../model/category");

///////////////////////////////////// TO RENDER THE CATEGORIES ////////////////////////////////////
exports.admincategoryViewGet = async (req, res) => {
  try {
    const category = await Category.find();
    res.render("admin_category_view", {
      categories: category,
    });
  } catch (err) {
    res.send(500).send("Error retriving Categories");
  }
};

////////////////////////////////////////////// TO RENDER THE CATEGORY ADD ///////////////////////////////////
exports.adminCategoryAddGet = (req, res) => {
  res.render("admin_category_add");
};

//////////////////////////////////////////////////// TO ADD NEW CATEGORY ///////////////////////////////////
exports.adminCategoryAddPost = async (req, res) => {
  const valid = await validationCategory(req.body, req.file);

  try {
    if (!valid.isValid) {
      const error = new Error();
      error.code = 400;
      error.errors = valid.errors;
      throw error;
    }

    const file = req.file;
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Category",
    });

    const image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    const { name } = req.body;
    
    const category = new Category({
      categoryName: name,
      imageUrl: image,
    });

    if (valid.isValid) {
      await category.save();
      res.status(200).end();
    } else {
      res.status(400).json({ error: valid.errors });
    }
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({ error: err.errors });
    }
  }
};


/////////////////////////////////////////////// TO RENDER THE CATEGORY EDIT ////////////////////////////////////
exports.adminCategoryEditGet = async (req, res) => {
  try {
    const id = req.params.category_id;
    const category = await Category.findById(id);
    res.render("admin_category_edit", { category: category });
  } catch (err) {
    res.status(500).send("Error occured");
  }
};


///////////////////////////////////////////////// TO EDIT THE CATEGORY ////////////////////////////////////////////
exports.adminCategoryEditPost = async (req, res) => {
  const valid = await validationCategoryName(req.body);
  try {
    const id = req.params.category_id;
    const { name } = req.body;
    const file = req.file;
    const existingCategory = await Category.findById(id);

    if (existingCategory) {
      existingCategory.categoryName = name;

      if (file) {
        if (existingCategory.imageUrl && existingCategory.imageUrl.public_id) {
          await cloudinary.uploader.destroy(
            existingCategory.imageUrl.public_id
          );
        }
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "Category",
        });

        existingCategory.imageUrl = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
      // if (valid.isValid) {
        await existingCategory.save();
        res.status(200).end();
      // } else {
        // res.status(400).json({ error: valid.errors });
      // }
    // } else {
      // res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update category" });
  }
};

//////////////////////////////////////////// TO UNLIST THE CATEGORY /////////////////////////////////////////////
exports.adminCategoryUnList = async (req, res) => {
  try{
    const categoryId = req.query.categoryId
    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { isAvailable: false } },
      { new: true }
    );
    return res.status(200).end();
  }catch(err){
    console.log(err);
  }
}

exports.adminCategoryList = async (req, res) => {
  try{
    const categoryId = req.query.categoryId;
    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { isAvailable: true } },
      { new: true }
    );
    return res.status(200).end();
  }catch(err){
    console.log(err);
  }
}





async function validationCategory(data, file) {
  const errors = {};

  if (!file) {
    errors.categoryImageError = "Category should have an image";
  }

  const { name } = data;
  const lowercaseName = name.toLowerCase();
  const nameRegex = /^[A-Za-z]+$/;
  const existingCategory = await Category.findOne({
    categoryName: { $regex: new RegExp("^" + lowercaseName, "i") },
  });

  if (!name) {
    errors.categoryNameError = "Category name cannot be empty";
  } else if (!nameRegex.test(name)) {
    errors.categoryNameError = "Category name should contain only alphabets";
  } else if (existingCategory) {
    errors.categoryNameError = "Category already exists";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

async function validationCategoryName(data) {
  const errors = {};

  const { name } = data;
  const lowercaseName = name.toLowerCase();
  const nameRegex = /^[A-Za-z]+$/;
  const existingCategory = await Category.findOne({
    categoryName: { $regex: new RegExp("^" + lowercaseName, "i") },
  });

  if (!name) {
    errors.categoryNameError = "Category name cannot be empty";
  } else if (!nameRegex.test(name)) {
    errors.categoryNameError = "Category name should contain only alphabets";
  } else if (existingCategory) {
    errors.categoryNameError = "Category already exists";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
