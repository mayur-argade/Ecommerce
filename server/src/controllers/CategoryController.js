const statusCode = require('../data/statusCode');
const categoryService = require('../services/category-service');


exports.createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: "Name and Description is Mandatory" })
    }

    let data = {
        name: name,
        description: description
    }

    try {
        const category = await categoryService.findCategory({ name: name })
        console.log(category)
        if (!category || category == undefined || category.length == 0) {
            const category = await categoryService.createCategory(data)
            return res.status(statusCode.SUCCESS.code).json({ message: "Category Created", data: category })
        } else {
            return res.status(statusCode.CONFLICT.code).json({ msg: "category Already exist" })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message })
    }


}

// User retrieves a list of categories using GET /api/categories.
exports.getAllCategory = async (req, res) => {
    try {
        const category = await categoryService.findCategory()
        return res.status(statusCode.SUCCESS.code).json({ message: "Categories", data: category })
    } catch (error) {
        // console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message })
    }
}