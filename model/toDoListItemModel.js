const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDoListItemSchema = new Schema({
    title: String,
    detail: String,
    done: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    archived: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ToDoListItem', toDoListItemSchema);;