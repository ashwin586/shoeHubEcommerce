const cloudinary = require("../../config/cloudinary");
const Category = require("../../model/category");

exports.admincategoryViewGet = async (req, res) => {
  if (req.session.adminEmail) {
    try {
      const category = await Category.find();
      res.render("admin_category_view", {
        categories: category,
      });
    } catch (err) {
      res.send(500).send("Error retriving Categories");
    }
  } else {
    res.render("admin_login");
  }
};

exports.adminCategoryAddGet = (req, res) => {
  if (req.session.adminEmail) {
    res.render("admin_category_add");
  } else {
    res.render("admin_login");
  }
};

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

exports.adminCategoryEditGet = async (req, res) => {
  try {
    if (req.session.adminEmail) {
      const id = req.params.category_id;
      const category = await Category.findById(id);
      res.render("admin_category_edit", { category: category });
    } else {
      res.render("admin_login");
    }
  } catch (err) {
    res.status(500).send("Error occured");
  }
};

exports.adminCategoryEditPost = async (req, res) => {
  const valid = await validationCategoryName(req.body);

  try {
    if (req.session.adminEmail) {
      const id = req.params.category_id;
      const { name } = req.body;
      const file = req.file;
      const existingCategory = await Category.findById(id);


      if (existingCategory) {
        existingCategory.categoryName = name;

        if (file) {
          if (
            existingCategory.imageUrl &&
            existingCategory.imageUrl.public_id
          ) {
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

        if(valid.isValid){
          await existingCategory.save();
          res.status(200).end();
        } else {
          res.status(400).json({ error: valid.errors });
        }

      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } else {
      res.status(401).send("Unauthorised");
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update category" });
  }
};

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
