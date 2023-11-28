//bug
const bcrypt = require('bcryptjs')
exports.decrypt = async (req, res) => {
    try {
        if (req.body != null) {
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
                res.json(400)
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}