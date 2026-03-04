import mongoose, {Schema , model , models} from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true },
        level: { type: String, required: true, default: "Beginner" },
        topscore: { type: Number, required: true, default: 0 },
        history: {
            type: [
                {
                    date: { type: Date, required: true },
                    time: { type: String, required: true },
                    score: { type: Number, required: true },
                },
            ],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model('User' , userSchema);

export default User;