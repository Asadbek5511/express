import User from '../schemas/user.schema.js';
import { ApiError } from '../utils/custom-error.js';
import { errorRes } from '../utils/error-response.js';
import { successRes } from '../utils/success-response.js';

class UserController{
    async create(req, res){
        try {
            const { userName } = req.body
            const userData = await User.findOne({ userName });
            if (userData) {
                throw new ApiError('this user alredy exist', 409)
            }
            const data = await User.create(req.body);
            successRes(res, data, 201)
        } catch (error) {
            errorRes(res, error)
        }
    }
    async findAll(_req, res){
        try {
            const datas = await User.find()
            if (!datas) {
                throw new ApiError('Users not found')
            }
            successRes(res, datas)
        } catch (error) {
            console.error(error)
        }
    }
    async findOne(req, res){
        try {
            const data = await User.findById(req.params.id)
            if (!data) {
                throw new ApiError('user not found', 404)
            }
            successRes(res, data)
        } catch (error) {
            errorRes(res, error)
        }
    }
    async update(req, res){
        try {
            const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!data) {
                throw new ApiError('User not found', 404)
            }
            successRes(res, data)
        } catch (error) {
            errorRes(res, error)
        }
    }
    async remove(req, res){
        try {
            const data = await User.findByIdAndDelete(req.params.id)
            if (!data) {
                throw new ApiError('user not found', 404)
            }
            successRes(res, {})
        } catch (error) {
            errorRes(res, error)
        }
    }
}

export default new UserController;