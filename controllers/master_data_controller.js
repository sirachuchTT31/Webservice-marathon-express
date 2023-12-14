let masterlocationModel = require('../models/master_location_model.js')

//location crud
exports.createLocation = async (req, res) => {
    try {
        if (req.body) {
            let location_id_auto_complies = "LOCATION"
            let math = Math.random() * 10000000
            let newmath = Math.ceil(math)
            let new_location_id_auto_complies = location_id_auto_complies + String(newmath)
            let newObject = {
                location_id: new_location_id_auto_complies,
                location_province: req.body.location_province,
                location_district: req.body.location_district,
                location_zipcode: req.body.location_zipcode,
                location_address: req.body.location_address
            }
            let newmasterModel = await masterlocationModel.create(newObject)
            if (newmasterModel) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Created successfully !",
                    result: newObject.location_id
                })
            }
        }
        else {
            res.json({
                status: false,
                status_code: 400,
                message: "Value is null bad request",
                result: null
            })
        }
    }
    catch (e) {
        console.log(e)
    }
}