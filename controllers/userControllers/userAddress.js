const User = require("../../model/users");

exports.userAddressPost = async (req, res) => {
  const { fullName, email, phoneNo, address, city, pinCode, stateId } =
    req.body;
  try {
    const user = await User.findOne({ email: req.session.email });
    const newAddress = {
      name: fullName,
      email: email,
      phoneNo: phoneNo,
      streetAddress: address,
      city: city,
      pinCode: pinCode,
      state: stateId,
    };
    user.address.push(newAddress);
    await user.save();
    return res.status(200).json(newAddress);
  } catch (err) {
    console.log(err);
  }
};

exports.userAddressRemovePost = async (req, res) =>{
  const addressId = req.query.addressId;
  if(req.session.email){
    try{
      const user = await User.findOne({email: req.session.email});
      if(user){
        const addressIndex = user.address.findIndex(address => address._id.toString() == addressId)
        if(addressIndex > -1){
          user.address.splice(addressIndex, 1);
          await user.save();
          return res.status(200).end();
        }
      }
    }catch(err){
      console.log(err);
    }
  }
}
