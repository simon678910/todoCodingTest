const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    toDoListItems: [{
        type: Schema.Types.ObjectId, 
        ref: 'ToDoListItem'
    }]
});

module.exports = mongoose.model('User', userSchema);;