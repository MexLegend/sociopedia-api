import { Types } from 'mongoose';

const userIds = [
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
    new Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        firstName: "test",
        lastName: "me",
        email: "aaaaaaa@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1693056213/Users/cvw5asasejvcsspmrufm.png",
        friends: [] as string[],
        location: "San Fran, CA",
        occupation: "Software Engineer",
        viewedProfile: 14561,
        impressions: 888822,
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        firstName: "Steve",
        lastName: "Ralph",
        email: "thataaa@gmail.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1691610840/Users/z7oysmo2iy78zelqxwof.png",
        friends: [] as string[],
        location: "New York, CA",
        occupation: "Scientist",
        viewedProfile: 12351,
        impressions: 55555,
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        firstName: "Some",
        lastName: "Guy",
        email: "someguy@gmail.com",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1690430498/Users/lawyer_7_xckjfv.png",
        friends: [] as string[],
        location: "Canada, CA",
        occupation: "Data Scientist Hacker",
        viewedProfile: 45468,
        impressions: 19986,
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        firstName: "Whatcha",
        lastName: "Doing",
        email: "whatchadoing@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529482/ReactWeb1/p1_yiwrf8.jpg",
        friends: [] as string[],
        location: "Korea, CA",
        occupation: "Educator",
        viewedProfile: 41024,
        impressions: 55316,
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529483/ReactWeb1/p5_sx7ybi.jpg",
        friends: [] as string[],
        location: "Utah, CA",
        occupation: "Hacker",
        viewedProfile: 40212,
        impressions: 7758,
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        firstName: "Harvey",
        lastName: "Dunn",
        email: "harveydunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529482/ReactWeb1/p3_hjqkbt.jpg",
        friends: [] as string[],
        location: "Los Angeles, CA",
        occupation: "Journalist",
        viewedProfile: 976,
        impressions: 4658,
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        firstName: "Carly",
        lastName: "Vowel",
        email: "carlyvowel@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529485/ReactWeb1/p13_p5bb9n.jpg",
        friends: [] as string[],
        location: "Chicago, IL",
        occupation: "Nurse",
        viewedProfile: 1510,
        impressions: 77579,
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        firstName: "Jessica",
        lastName: "Dunn",
        email: "jessicadunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529485/ReactWeb1/p11_mmzjjd.jpg",
        friends: [] as string[],
        location: "Washington, DC",
        occupation: "A Student",
        viewedProfile: 19420,
        impressions: 82970,
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
];

export const posts = [
    {
        _id: new Types.ObjectId(),
        userId: userIds[1],
        firstName: "Steve",
        lastName: "Ralph",
        location: "New York, CA",
        description: "Some really long random description",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529486/ReactWeb1/post1_khlvwm.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1691610840/Users/z7oysmo2iy78zelqxwof.png",
        likes: new Map([
            [userIds[0], true],
            [userIds[2], true],
            [userIds[3], true],
            [userIds[4], true],
        ]),
        comments: [
            "random comment",
            "another random comment",
            "yet another random comment",
        ],
    },
    {
        _id: new Types.ObjectId(),
        userId: userIds[3],
        firstName: "Whatcha",
        lastName: "Doing",
        location: "Korea, CA",
        description:
            "Another really long random description. This one is longer than the previous one.",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529486/ReactWeb1/post2_xtoa51.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529482/ReactWeb1/p1_yiwrf8.jpg",
        likes: new Map([
            [userIds[7], true],
            [userIds[4], true],
            [userIds[1], true],
            [userIds[2], true],
        ]),
        comments: [
            "one more random comment",
            "and another random comment",
            "no more random comments",
            "I lied, one more random comment",
        ],
    },
    {
        _id: new Types.ObjectId(),
        userId: userIds[4],
        firstName: "Jane",
        lastName: "Doe",
        location: "Utah, CA",
        description:
            "This is the last really long random description. This one is longer than the previous one.",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529487/ReactWeb1/post6_oityjj.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529483/ReactWeb1/p5_sx7ybi.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
            [userIds[5], true],
        ]),
        comments: [
            "one more random comment",
            "I lied, one more random comment",
            "I lied again, one more random comment",
            "Why am I doing this?",
            "I'm bored",
        ],
    },
    {
        _id: new Types.ObjectId(),
        userId: userIds[5],
        firstName: "Harvey",
        lastName: "Dunn",
        location: "Los Angeles, CA",
        description:
            "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529487/ReactWeb1/post5_xcazv7.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529482/ReactWeb1/p3_hjqkbt.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
        ]),
        comments: [
            "I lied again, one more random comment",
            "Why am I doing this?",
            "I'm bored",
            "I'm still bored",
            "All I want to do is play video games",
            "I'm going to play video games",
        ],
    },
    {
        _id: new Types.ObjectId(),
        userId: userIds[6],
        firstName: "Carly",
        lastName: "Vowel",
        location: "Chicago, IL",
        description:
            "Just a short description. I'm tired of typing. I'm going to play video games now.",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529487/ReactWeb1/post6_oityjj.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529485/ReactWeb1/p13_p5bb9n.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[3], true],
            [userIds[5], true],
            [userIds[7], true],
        ]),
        comments: [
            "I lied again, one more random comment",
            "Why am I doing this?",
            "Man I'm bored",
            "What should I do?",
            "I'm going to play video games",
        ],
    },
    {
        _id: new Types.ObjectId(),
        userId: userIds[7],
        firstName: "Jessica",
        lastName: "Dunn",
        location: "Washington, DC",
        description:
            "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        imgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529782/ReactWeb1/post7_dlwvgy.jpg",
        userImgPath: "https://res.cloudinary.com/devmexsoft/image/upload/v1694529485/ReactWeb1/p11_mmzjjd.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[2], true],
        ]),

        comments: [
            "Can I play video games now?",
            "No let's actually study",
            "Never mind, I'm going to play video games",
            "Stop it.",
            "Michael, stop it.",
        ],
    },
];