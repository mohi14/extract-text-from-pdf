import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://mamtazfreelancer:f7FcczeDomuZ5F3L@cluster0.6ds5s8q.mongodb.net/pdf', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const resumeInfo = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""

    },
    linkedin: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: ""
    }

});

const ResumeText = mongoose.model('ResumeText', resumeInfo);

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const result = await ResumeText.create(data);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};