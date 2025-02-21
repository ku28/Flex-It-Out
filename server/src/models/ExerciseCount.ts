import mongoose from 'mongoose';

const exerciseCountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    exerciseType: {
        type: String,
        required: true,
        enum: ['pushup', 'squat']
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const ExerciseCount = mongoose.model('ExerciseCount', exerciseCountSchema);