//bug
const bcrypt = require('bcryptjs')
let error_message = require('../shared/status_message_func.js')
exports.decrypt = async (req, res) => {
    try {
        if (req.body) {
            let decrypt_pass = await bcrypt.compare(req.body.password,salt)
            console.log(decrypt_pass)
            if (decrypt_pass) {
                res.json({
                    status: true,
                    status_code: 200,
                    message: "Passphrase was successfully decrypted",
                    result: decrypt_pass
                })
            }
            else {
                res.json(error_message.message_error_400)
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}