const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const bcrypt = require('bcrypt');
const statusCode = require('../data/statusCode');

exports.register = async (req, res) => {

    // get data from the body
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: "All field are manadatory" })
    }

    let data = {
        name: name,
        email: email,
        password: password,
        lastLogin: null
    }

    let user;

    try {
        user = await userService.findUser({ email: email })
        if (!user) {
            user = await userService.createUser(data)
        } else {
            return res.status(statusCode.CONFLICT.code).json({ message: "This email already exist try signing in" })
        }
    } catch (error) {
        // console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }

    const { accessToken } = tokenService.generateTokens({
        _id: user._id,
        activated: false,
    });

    user.password = null

    res
        .status(statusCode.SUCCESS.code)
        .cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })
        .json({ message: "user", data: user });
};

exports.signin = async (req, res) => {
    // get email and password from the user
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All field are manadatory" })
    }

    let user;
    let updatedUser;
    try {
        user = await userService.findUser({ email: email })

        if (!user) {
            return res.status(404).json({ msg: "User does not found" })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ msg: "Incorrect password" });
            }
            let data = {
                email: user.email,
                lastLogin: new Date()
            }
            updatedUser = await userService.updateuser(data)
            console.log(updatedUser._id)
            const accessToken = tokenService.generateTokens({ id: updatedUser._id })

            updatedUser.password = null
            console.log(accessToken)
            res
                .status(200)
                .cookie("accessToken", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                })
                .json({ user: updatedUser });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
}

exports.updateuser = async (req, res) => {

    // get phone and address from the user
    const { email, phone, address } = req.body;
    // console.log("userid from req", req.user)
    // check if user provided phone and address 
    if (!email || !phone || !address.line1 || !address.city || !address.state || !address.postalcode || !address.country) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: "Missing fields" })
    }

    let user;

    try {
        user = await userService.findUser({ email })
        if (!user) {
            return res.status(statusCode.NOT_FOUND.code).json({ message: "User does not found" })
        }

        let data = {
            email: email,
            phone: phone,
            address: {
                line1: address.line1,
                city: address.city,
                state: address.state,
                postalcode: address.postalcode,
                country: address.country
            },
            lastLogin: new Date()
        }

        updatedUser = await userService.updateuser(data)

        res.status(statusCode.SUCCESS.code).json({ message: "User Data has been updated", data: updatedUser })
    } catch (error) {
        // console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message })
    }


}