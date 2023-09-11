"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postModel = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "User Id is required"]
    },
    firstName: {
        type: String,
        required: [true, 'User Name Is required']
    },
    lastName: {
        type: String,
        required: [true, 'User LastName Is required']
    },
    imgPath: String,
    userImgPath: String,
    location: String,
    description: String,
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Map,
        of: Boolean
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Posts', postModel);
//# sourceMappingURL=postMdl.js.map