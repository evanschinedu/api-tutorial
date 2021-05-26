const db = require('../db/sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const User = db.user;
const { errorResponse, successResponse } = require('../helpers/responses');

class AuthenticationController {
    static async register(req, res) {
        try {
            const user = await User.create({
                profile_picture: req.body.profile_picture,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                nick_name: req.body.nick_name,
                phone_number: req.body.phone_number,
            });

            return successResponse(true, user, null, res);
        } catch (err) {
            return errorResponse(
                false,
                'Something went wrong',
                err.toString(),
                500,
                res

            );
        }
    }

    static async login(req, res) {
        try {
            User.findOne({
                where: { email: req.body.email },

            }).then(user => {
                if (!user) {
                    return errorResponse(
                        false,
                        'User not found',
                        'User not found',
                        404, res);
                }

                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if (!passwordIsValid) {
                    return errorResponse(
                        false,
                        'Invalid Password',
                        'Invalid Password',
                        401,
                        res
                    );
                }

                return successResponse(true, user, null, res);

            }).catch(err => {
                errorResponse(
                    false,
                    errorMessages.catchMessage,
                    err.toString(),
                    500,
                    res

                );
            });
        } catch (error) {
            return errorResponse(
                false,
                'Something went wrong',
                err.toString(),
                500,
                res

            );
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await User.update({
                email: req.body.email,
            },
                { where: { id: req.params.id } }
            );

            if (user[0] === 0) {
                return successResponse(false, 'User does not exist', null, res);
            } else {
                return successResponse(true, 'User updated successfully', null, res);
            }
        } catch (err) {
            return errorResponse(
                false,
                'Something went wrong',
                err.toString(),
                500,
                res
            );
        }
    }

    static async showAllUsers(req, res) {
        User.findAll({
        }).then(users => {
            return successResponse(
                true,
                users,
                undefined,
                res
            );
        }).catch(err => {
            return errorResponse(
                false,
                'Something went wrong',
                err.toString(),
                500,
                res

            );
        });
    }
}

module.exports = {
    register: AuthenticationController.register,
    login: AuthenticationController.login,
    updateUser: AuthenticationController.updateUser,
    showAllUsers: AuthenticationController.showAllUsers,
};