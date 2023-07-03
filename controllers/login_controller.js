var db = require('./../helpers/db_helpers')
var helper = require('./../helpers/helpers')
var multiparty = require("multiparty")
var fs = require("fs")
var imageSavePath = "./public/img/"

const msg_success = "successfully";
const msg_fail = "fail";
const msg_invalidUserPassword = "invalid username and password";
const msg_invalidUser = "invalid username";

module.exports.controller = (app, io, socket_list) => {

    const msg_exits_email = "already used this email";
    const msg_exits_user = "user not exits";
    const msg_update_password = "user password updated successfully";

    app.post('/api/login', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["email", "password", "push_token"], () => {

            getUserWithPasswordData(reqObj.email, reqObj.password, (status, result) => {
                if (status) {
                    var auth_token = helper.createRequestToken();
                    db.query('UPDATE `user_detail` SET `auth_token`= ?,`push_token`=? WHERE `user_id` = ?  AND `status` = ? ', [
                        auth_token, reqObj.push_token, result.user_id, "1"], (err, uResult) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            }

                            if (uResult.affectedRows > 0) {
                                result.auth_token = auth_token;
                                res.json({ "status": "1", "payload": result, "message": msg_success })
                            } else {
                                res.json({ "status": "0", "message": msg_invalidUserPassword })
                            }
                        })
                } else {
                    res.json({ "status": "0", "message": result })
                }
            })

        })
    })

    app.post('/api/sign_up', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["name", "mobile", "email", "address", "password", "push_token", "device_type"], () => {
            db.query("SELECT `user_id`, `email` FROM `user_detail` WHERE `email` = ? ", [reqObj.email], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.length == 0) {
                    // No Email Found
                    var authToken = helper.createRequestToken();
                    var restCode = helper.createNumber();

                    db.query('INSERT INTO `user_detail`(`name`, `email`, `password`, `mobile`, `address`, `device_type`, `auth_token`, `push_token`, `reset_code` , `created_date`, `update_date`) VALUES (?,?,?, ?,?,?,  ?,?,?, NOW(), NOW() )', [
                        reqObj.name, reqObj.email, reqObj.password, reqObj.mobile, reqObj.address, reqObj.device_type, authToken, reqObj.push_token, restCode
                    ], (err, iResult) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (iResult) {
                            getUserData(iResult.insertId, (userObj) => {
                                res.json({ "status": "1", "payload": userObj, "message": msg_success })
                            })

                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })

                } else {
                    res.json({ "status": "0", "message": msg_exits_email })
                }
            })
        })
    })

    app.post('/api/forgot_password_request', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["email"], () => {
            db.query("SELECT `user_id`, `email` FROM `user_detail` WHERE `email` = ? ", [reqObj.email], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.length > 0) {
                    // Email Found
                    var restCode = helper.createNumber();
                    db.query('UPDATE `user_detail` SET `reset_code`= ? WHERE `email` = ? AND `status` = ? ', [
                        restCode, reqObj.email, "1"], (err, uResult) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            }

                            if (uResult.affectedRows > 0) {

                                res.json({ "status": "1", "message": msg_success })
                            } else {
                                res.json({ "status": "0", "message": msg_fail })
                            }
                        })

                } else {
                    res.json({ "status": "0", "message": msg_exits_user })
                }
            })
        })
    })

    app.post('/api/forgot_password_verify', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["email", "reset_code"], () => {
            db.query("SELECT `user_id`, `email` FROM `user_detail` WHERE `email` = ? AND `reset_code` = ? ", [reqObj.email, reqObj.reset_code], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.length > 0) {
                    // Email Found
                    var restCode = helper.createNumber();
                    db.query('UPDATE `user_detail` SET `reset_code`= ? WHERE `email` = ? AND `status` = ? ', [
                        restCode, reqObj.email, "1"], (err, uResult) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return
                            }

                            if (uResult.affectedRows > 0) {

                                res.json({ "status": "1", "payload": { "user_id": result[0].user_id, "reset_code": restCode }, "message": msg_success })
                            } else {
                                res.json({ "status": "0", "message": msg_fail })
                            }
                        })

                } else {
                    res.json({ "status": "0", "message": msg_exits_user })
                }
            })
        })
    })

    app.post('/api/forgot_password_set_new', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ["user_id", "reset_code", "new_password"], () => {

            var restCode = helper.createNumber();
            db.query("UPDATE `user_detail` SET `password` = ? , `reset_code` = ? WHERE `user_id` = ? AND `reset_code` = ? AND `status` = ? ", [reqObj.new_password, restCode, reqObj.user_id, reqObj.reset_code, "1"], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.affectedRows > 0) {
                    // Email Found
                    res.json({ "status": "1", "message": msg_update_password })

                } else {
                    res.json({ "status": "0", "message": msg_fail })
                }
            })
        })
    })

    app.post('/api/update_profile', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["name", "mobile",  "address",], () => {

                db.query('UPDATE `user_detail` SET `name`=?,`mobile`=?,`address`=?,`update_date`=NOW() WHERE `user_id` = ? AND `status` = ? ', [
                    reqObj.name, reqObj.mobile,  reqObj.address, userObj.user_id, "1"], (err, uResult) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (uResult.affectedRows > 0) {
                            getUserData(userObj.user_id, (userObj) => {
                                res.json({ "status": "1", "payload": userObj, "message": msg_success })
                            })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })

        })
    })

    app.post('/api/update_image', (req, res) => {

        var form = new multiparty.Form();

        checkAccessToken(req.headers, res, (userObj) => {
            form.parse(req, (err, reqObj, files) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }

                helper.Dlog("--------------- Parameter --------------")
                helper.Dlog(reqObj);
                helper.Dlog("--------------- Files --------------")
                helper.Dlog(files);

                helper.CheckParameterValid(res, files, ["image"], () => {

                    var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                    var imageFileName = "user/" + helper.fileNameGenerate(extension);

                    var newPath = imageSavePath + imageFileName;

                    fs.rename(files.image[0].path, newPath, (err) => {

                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return;
                        } else {
                            db.query("UPDATE `user_detail` SET `image` = ?, `update_date` = NOW() WHERE `user_id` = ? AND `status` = ? ", [
                                imageFileName, userObj.user_id, "1"
                            ], (err, result) => {

                                if (err) {
                                    helper.ThrowHtmlError(err, res);
                                    return;
                                }

                                if (result) {
                                    getUserData(userObj.user_id, (userObj) => {
                                        res.json({ "status": "1", "payload": userObj, "message": msg_success })
                                    })
                                } else {
                                    res.json({ "status": "0", "message": msg_fail })
                                }
                            })
                        }
                    })

                })
            })
        })

    })
}

function getUserData(user_id, callback) {
    db.query('SELECT `user_id`, `name`, `email`, `password`, `mobile`, `address`, `image`, `device_type`, `auth_token`, `user_type` FROM `user_detail` WHERE `user_id` = ? AND `status` = ?', [user_id, '1'], (err, result) => {
        if (err) {
            helper.ThrowHtmlError(err);
            return;
        }

        if (result.length > 0) {
            return callback(result[0])
        }
    })
}

function getUserWithPasswordData(email, password, callback) {
    db.query('SELECT `user_id`, `name`, `email`, `password`, `mobile`, `address`, `image`, `device_type`, `auth_token`, `user_type`  FROM `user_detail` WHERE `email` = ? AND `password` = ? AND `status` = ?', [email, password, '1'], (err, result) => {
        if (err) {
            helper.ThrowHtmlError(err);
            return callback(false, msg_fail)
        }

        if (result.length > 0) {
            return callback(true, result[0])
        } else {
            return callback(false, msg_invalidUserPassword)
        }
    })
}

function checkAccessToken(headerObj, res, callback, require_type = "") {
    helper.Dlog(headerObj.access_token);
    helper.CheckParameterValid(res, headerObj, ["access_token"], () => {
        db.query('SELECT `user_id`, `name`, `email`, `password`, `mobile`, `address`, `image`, `device_type`, `auth_token`, `user_type`, `status`  FROM `user_detail` WHERE `auth_token` = ? AND `status` = ?', [headerObj.access_token, "1"], (err, result) => {
            if (err) {
                helper.ThrowHtmlError(err, res);
                return;
            }

            helper.Dlog(result);
            if (result.length > 0) {
                if (require_type != "") {

                    if (result[0].user_type == require_type) {
                        return callback(result[0]);
                    } else {
                        res.json({ "status": "0", "code": "404", "message": "Access denied. Unauthorized user access." })
                    }
                } else {
                    return callback(result[0]);
                }
            } else {
                res.json({ "status": "0", "code": "404", "message": "Access denied. Unauthorized user access." })
            }
        })
    })
}