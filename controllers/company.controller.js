
const companyModel = require('../models/company.model');


const { body, validationResult } = require('express-validator');
//const path = require('path');
const mongoose = require('mongoose');
//const sendMail = require('../utils/mail');
const ObjectId = mongoose.Types.ObjectId;


const getCompanyDetail = Model => async (req, res) => {

    try {
        const { userId } = req.params;
        console.log(userId)

        const company = await Model.find(
            { users: { "$elemMatch": { user_id: userId } } }
        );

        if (company.length === 0) {
            res.json({ status: "failed", message: "No Company found for this user" })
        }

        res.json({ status: "success", company })

    } catch (error) {

    }





}
const add = Model => async (req, res) => {

    res.json({ message: "added" })
}
module.exports = {
    getCompanyDetail: getCompanyDetail(companyModel),
    add: add(companyModel)
}

