"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'User Name Is required'],
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: [true, 'User LastName Is required'],
        min: 2,
        max: 50
    },
    friends: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        required: [true, 'User Email Is required'],
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User Password Is require'],
        min: 5
    },
    imgPath: {
        type: String,
        default: ""
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Users', userSchema);
//# sourceMappingURL=userMdl.js.map