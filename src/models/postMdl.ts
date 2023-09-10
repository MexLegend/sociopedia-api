import { model, Schema } from 'mongoose';

const postModel = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
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
        comments:
        {
            type: Array,
            default: []
        }
        ,
        likes: {
            type: Map,
            of: Boolean
        }
    },
    { timestamps: true }
);

export default model('Posts', postModel);
