const Banners = require("../../model/banner");
const Cloudinary = require("../../config/cloudinary");

//////////////////////////////////// TO FETCH ALL BANNERS ////////////////////////////////
exports.adminBannerView = async (req, res) => {
  const banners = await Banners.find();
  res.render("admin_banner_view", { banners });
};

////////////////////////////////// TO RENDER THE BANNER ADD SECTION ///////////////////////
exports.adminAddBannerGet = async (req, res) => {
  res.render("admin_banner_add_get");
};

/////////////////////////////////// TO ADD BANNER /////////////////////////////////////
exports.adminAddBannerPost = async (req, res) => {
  const valid = addBannerValidation(req.body, req.file);
  try {
    if (!valid.isValid) {
      const error = new Error();
      error.code = 400;
      error.errors = valid.errors;
      throw error;
    }

    const { title, subTitle, label } = req.body;
    console.log(title, subTitle, label);
    const file = req.file;

    const result = await Cloudinary.uploader.upload(file.path, {
      folder: "Banners",
    });

    const image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    const banner = new Banners({
      title: title,
      subTitle: subTitle,
      image: image,
      label: label,
    });
    if (valid.isValid) {
      await banner.save();
      return res.status(200).end();
    }
  } catch (err) {
    if (err.code == 400) {
      res.status(400).json({ error: err.errors });
    }
    console.log(err);
  }
};

////////////////////////////////////////// TO GET THE EDIT PAGE ///////////////////////////////////////
exports.adminEditBannerGet = async (req, res) => {
  try {
    const bannerId = req.query.bannerId;
    const banner = await Banners.findById(bannerId);
    res.status(200).render("admin_banner_edit_get", { banner });
  } catch (err) {
    console.log(err);
  }
};

////////////////////////////////////////// TO EDIT THE BANNER FUNCTION ///////////////////////////////////
exports.adminEditBannerPost = async (req, res) => {
  try {
    const bannerId = req.body.bannerId;
    const { title, subTitle, label } = req.body;
    const file = req.file;
    const existingBanner = await Banners.findOne({ _id: bannerId });
    if (existingBanner) {
      existingBanner.title = title;
      existingBanner.subTitle = subTitle;
      existingBanner.label = label;
    }

    if (file) {
      if (existingBanner.image && existingBanner.image.public_id) {
        await Cloudinary.uploader.destroy(existingBanner.image.public_id);
      }

      const result = await Cloudinary.uploader.upload(file.path, {
        folder: "Category",
      });

      existingBanner.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await existingBanner.save();
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////// TO ENABLE OR DISABLE THE BANNER /////////////////////////////
exports.adminBannerAlterPost = async (req, res) => {
  try {
    let actionStatus = ''
    const bannerId  = req.body.bannerId;
    const banner = await Banners.findById(bannerId);
    const{ action } = req.params;
    if (action == "remove") {
      banner.active = false;
      actionStatus = false
    } else if (action == "add") {
      banner.active = true;
      actionStatus = true;
    }
    await banner.save();
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////// BANNER ADDING VALIDATION /////////////////////////////
function addBannerValidation(data, file) {
  const { title, subTitle, label } = data;

  const errors = {};

  if (!file) {
    errors.bannerImageError = "Please provide an image for the banner";
  }

  if (!title) {
    errors.bannerTitleError = "The banner title should not be empty";
  }

  if (!subTitle) {
    errors.bannerSubTitleError = "The banner sub title should not be empty ";
  }

  if (!label) {
    errors.bannerLabelError = "The banner label should not be empty";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
