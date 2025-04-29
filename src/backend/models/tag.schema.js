import mongoose from "mongoose"

const tagSchema = mongoose.Schema({
    tag: { type: String },
})

export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);