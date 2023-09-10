import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
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
    },
    { timestamps: true }
);

export default model('Users', userSchema);
