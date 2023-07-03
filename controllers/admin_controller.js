var db = require('./../helpers/db_helpers')
var helper = require('./../helpers/helpers')
var multiparty = require("multiparty");
var fs = require('fs');
var imageSavePath = "./public/img/"

const msg_success = "successfully";
const msg_fail = "fail";
const msg_invalidUserPassword = "invalid username and password";
const msg_invalidUser = "invalid username";

module.exports.controller = (app, io, socket_list) => {

    const msg_exits_email = "already used this email";
    const msg_exits_user = "user not exits";
    const msg_update_password = "user password updated successfully";
    const msg_add_restaurant = "Restaurant added Successfully.";
    const msg_update_restaurant = "Restaurant updated Successfully.";
    const msg_delete_restaurant = "Restaurant deleted Successfully.";
    const msg_add_restaurant_offer = "Restaurant offer added Successfully.";
    const msg_update_restaurant_offer = "Restaurant offer updated Successfully.";
    const msg_delete_restaurant_offer = "Restaurant offer deleted Successfully.";
    const msg_add = "Added Successfully.";
    const msg_update = "Updated Successfully.";
    const msg_delete = "Deleted Successfully.";


    app.post('/api/admin/restaurant_add', (req, res) => {

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

                helper.CheckParameterValid(res, reqObj, ["name", "shop_type", "food_type", "address", "city", "state", "latitude", "longitude", "delivery_cost"], () => {

                    helper.CheckParameterValid(res, files, ["image"], () => {

                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                        var imageFileName = "restaurant/" + helper.fileNameGenerate(extension);

                        var newPath = imageSavePath + imageFileName;

                        fs.rename(files.image[0].path, newPath, (err) => {

                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return;
                            } else {
                                db.query("INSERT INTO `restaurant_detail`( `name`, `image`, `shop_type`, `food_type`, `address`, `city`, `state`, `latitude`, `longitude`, `delivery_cost`, `create_date`, `update_date`) VALUES (?,?,?, ?,?,?, ?,?,?, ?,NOW(), NOW())", [
                                    reqObj.name[0], imageFileName, reqObj.shop_type[0], reqObj.food_type[0], reqObj.address[0], reqObj.city[0], reqObj.state[0], reqObj.latitude[0], reqObj.longitude[0], reqObj.delivery_cost[0]
                                ], (err, result) => {

                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return;
                                    }

                                    if (result) {
                                        res.json({ "status": "1", "message": msg_add_restaurant })
                                    } else {
                                        res.json({ "status": "0", "message": msg_fail })
                                    }
                                })
                            }
                        })

                    })
                })


            })
        }, "3")

    })

    app.post('/api/admin/restaurant_update', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["restaurant_id", "name", "shop_type", "food_type", "address", "city", "state", "latitude", "longitude", "delivery_cost"], () => {

                db.query('UPDATE `restaurant_detail` SET `name`=?,`shop_type`=?,`food_type`=?,`address`=?,`city`=?,`state`=?,`latitude`=?,`longitude`=?,`delivery_cost`=?,`update_date`=NOW() WHERE `restaurant_id` = ? AND `status` = ? ', [
                    reqObj.name, reqObj.shop_type, reqObj.food_type, reqObj.address, reqObj.city, reqObj.state, reqObj.latitude, reqObj.longitude, reqObj.delivery_cost, reqObj.restaurant_id, "1"], (err, uResult) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (uResult.affectedRows > 0) {
                            res.json({ "status": "1", "message": msg_update_restaurant })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })

        }, "3")
    })

    app.post('/api/admin/restaurant_update_image', (req, res) => {

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

                helper.CheckParameterValid(res, reqObj, ["restaurant_id"], () => {

                    helper.CheckParameterValid(res, files, ["image"], () => {

                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                        var imageFileName = "restaurant/" + helper.fileNameGenerate(extension);

                        var newPath = imageSavePath + imageFileName;

                        fs.rename(files.image[0].path, newPath, (err) => {

                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return;
                            } else {
                                db.query("UPDATE `restaurant_detail` SET `image` = ?, `update_date` = NOW() WHERE `restaurant_id` = ? AND `status` = ? ", [
                                    imageFileName, reqObj.restaurant_id[0], "1"
                                ], (err, result) => {

                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return;
                                    }

                                    if (result) {
                                        res.json({ "status": "1", "message": msg_success })
                                    } else {
                                        res.json({ "status": "0", "message": msg_fail })
                                    }
                                })
                            }
                        })

                    })
                })


            })
        }, "3")

    })

    app.post('/api/admin/restaurant_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["restaurant_id"], () => {


                db.query('UPDATE `restaurant_detail` SET `status`=?,`update_date`=NOW() WHERE `restaurant_id` = ? AND `status` = ? ', [
                    "2", reqObj.restaurant_id, "1"], (err, uResult) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (uResult.affectedRows > 0) {
                            res.json({ "status": "1", "message": msg_delete_restaurant })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })

        }, "3")
    })

    app.post('/api/admin/restaurant_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {

            db.query('SELECT `restaurant_id`, `name`, `image`, `shop_type`, `food_type`, `address`, `city`, `state`, `latitude`, `longitude`, `delivery_cost`, `create_date`, `update_date`, `status` FROM `restaurant_detail` WHERE `status` = ? ', [
                "1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }

                    res.json({ "status": "1", "payload": result.replace_null(), "message": msg_success })
                })
        }, "3")
    })

    app.post('/api/admin/restaurant_offer_add', (req, res) => {

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

                helper.CheckParameterValid(res, reqObj, ["name", "restaurant_id", "start_date", "end_date"], () => {

                    helper.CheckParameterValid(res, files, ["image"], () => {

                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                        var imageFileName = "offer/" + helper.fileNameGenerate(extension);

                        var newPath = imageSavePath + imageFileName;

                        fs.rename(files.image[0].path, newPath, (err) => {

                            if (err) {
                                helper.ThrowHtmlError(err, res);
                                return;
                            } else {
                                db.query("INSERT INTO `offer_detail`( `name`, `image`, `restaurant_id`, `start_date`, `end_date`, `create_date`, `update_date`) VALUES (?,?,?, ?,?,NOW(), NOW())", [
                                    reqObj.name[0], imageFileName, reqObj.restaurant_id[0], reqObj.start_date[0], reqObj.end_date[0]
                                ], (err, result) => {

                                    if (err) {
                                        helper.ThrowHtmlError(err, res);
                                        return;
                                    }

                                    if (result) {
                                        res.json({ "status": "1", "message": msg_add_restaurant_offer })
                                    } else {
                                        res.json({ "status": "0", "message": msg_fail })
                                    }
                                })
                            }
                        })

                    })
                })


            })
        }, "3")

    })

    app.post('/api/admin/restaurant_offer_update', (req, res) => {

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

                helper.CheckParameterValid(res, reqObj, ["offer_id", "name", "restaurant_id", "start_date", "end_date"], () => {


                    var condition = ""
                    var imageFileName = ""
                    if (files.image != undefined || files.image != null) {
                        var extension = files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1);
                        imageFileName = "offer/" + helper.fileNameGenerate(extension);
                        newPath = imageSavePath + imageFileName;
                        condition = " `image` = '" + imageFileName + "',"
                        fs.rename(files.image[0].path, newPath, (err) => {
                            if (err) {
                                helper.ThrowHtmlError(err);
                                return;
                            }
                        })
                    }

                    db.query("UPDATE `offer_detail` SET `name` = ?, " + condition + "  `start_date` = ?, `end_date` = ?,  `update_date` = NOW() WHERE `restaurant_id` = ? AND `status` < ? AND `offer_id` = ? ", [
                        reqObj.name[0], reqObj.start_date[0], reqObj.end_date[0], reqObj.restaurant_id[0], "2", reqObj.offer_id[0]
                    ], (err, result) => {

                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return;
                        }

                        if (result) {
                            res.json({ "status": "1", "message": msg_update_restaurant_offer })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })

                })



            })
        }, "3")

    })

    app.post('/api/admin/restaurant_offer_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["offer_id"], () => {


                db.query('UPDATE `offer_detail` SET `status`=?,`update_date`=NOW() WHERE `offer_id` = ? AND `status` != ? ', [
                    "2", reqObj.offer_id, "2"], (err, uResult) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (uResult.affectedRows > 0) {
                            res.json({ "status": "1", "message": msg_delete_restaurant_offer })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })

        }, "3")
    })

    app.post('/api/admin/restaurant_offer_active_inactive', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["offer_id", "is_active"], () => {


                db.query('UPDATE `offer_detail` SET `status`=?,`update_date`=NOW() WHERE `offer_id` = ? AND `status` != ? ', [
                    reqObj.is_active, reqObj.offer_id, "2"], (err, uResult) => {
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
            })

        }, "3")
    })

    app.post('/api/admin/restaurant_offer_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {

            db.query('SELECT `offer_id`, `name`, `restaurant_id`, `image`, `start_date`, `end_date`, `status`, `create_date`, `update_date` FROM `offer_detail` WHERE `status` != ? ', [
                "2"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }
                    res.json({ "status": "1", "payload": result.replace_null(), "message": msg_success })
                })
        }, "3")
    })

    app.post('/api/admin/about_list', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {

            db.query('SELECT `about_id`, `detail` FROM `about_detail` WHERE `status` = ? ORDER BY `display_order` ', [
                "1"], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }
                    res.json({ "status": "1", "payload": result.replace_null(), "message": msg_success })
                })
        }, "3")
    })

    app.post('/api/admin/about_add', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["detail", "display_order"], () => {
                db.query('INSERT INTO `about_detail`(`detail`, `display_order`, `created_date`, `update_date`) VALUES (?,?,NOW(), NOW() )', [
                    reqObj.detail, reqObj.display_order], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (result) {
                            res.json({ "status": "1", "message": msg_add })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }

                    })
            })
        }, "3")
    })

    app.post('/api/admin/about_update', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["about_id", "detail", "display_order"], () => {
                db.query('UPDATE `about_detail` SET `detail` = ?, `display_order` = ?,`update_date` = NOW() WHERE `about_id` = ?  AND `status` = ? ', [
                    reqObj.detail, reqObj.display_order, reqObj.about_id, "1"], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (result.affectedRows > 0) {
                            res.json({ "status": "1", "message": msg_update })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })
        }, "3")
    })


    app.post('/api/admin/about_delete', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        checkAccessToken(req.headers, res, (userObj) => {
            helper.CheckParameterValid(res, reqObj, ["about_id"], () => {
                db.query('UPDATE `about_detail` SET `status` = ?, `update_date` = NOW() WHERE `about_id` = ?  AND `status` = ? ', [
                    "2", reqObj.about_id, "1"], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (result.affectedRows > 0) {
                            res.json({ "status": "1", "message": msg_delete })
                        } else {
                            res.json({ "status": "0", "message": msg_fail })
                        }
                    })
            })
        }, "3")
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