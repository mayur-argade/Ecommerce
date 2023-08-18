const categoryModel = require('../models/CategoryModel')

class categoryService {
    async createCategory(data) {
        const category = categoryModel.create(data);
        return category;
    }
    async findCategory(filter) {
        const category = categoryModel.find(filter)
        return category
    }

    async updateCategory(filter) {
        const category = categoryModel.findOneAndUpdate({ name: filter.name }, filter)
        return category
    }

}

module.exports = new categoryService();