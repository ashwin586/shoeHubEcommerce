exports.userOrderSuccessGet = async (req, res) => {
    try{
        if(req.session.email){
            res.render('order_success', {loggedIn: true});
        }
    }catch(err){
        console.log(err);
    }
}