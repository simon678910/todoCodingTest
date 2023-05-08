const ToDoListItem = require('../model/toDoListItemModel');
const User = require('../model/userModel');
const toDoListController = class {
    constructor () {

    }

    addItemToUserToDoList(userId, itemDetail, cb) {
        const newToDoListItem = new ToDoListItem({ owner: userId, ...itemDetail });

        newToDoListItem.save((err, savedNewToDoListItem) => {
            if (err) {
                return cb(err);
            }

            User.updateOne({
                $addToSet: {
                    toDoListItems: savedNewToDoListItem._id
                }
            }).exec((err, user) => {
                if (err) {
                    return cb(err);
                }

                cb(null, { success: true });
            })
        });
    } 

    getToDoListByUserId(userId, cb) {
        User.findOne({
            _id: userId
        })
        .populate('toDoListItems')
        .exec((err, user)=> {
            if (err) {
                return cb(err);
            }
            cb(null, user.toDoListItems);
        });
    }

    updateToDoListItemById(userId, itemId, updatedItem, cb) {
        ToDoListItem.updateOne({
            _id: itemId,
            owner: userId
        }, {
            $set: updatedItem
        }).exec((err, toDoListItemResult) => {
            if (err) {
                return cb(err);
            }

            cb(null, { success: true });
        });
    }

    removeItemFUserToDoList(userId, itemId, cb) {
        ToDoListItem.updateOne({
            _id: itemId,
            owner: userId
        }, {
            $set: {
                archived: true
            }
        }).exec((err, toDoListItemResult) => {
            if (err) {
                return cb(err);
            }

            User.updateOne({
                _id: userId,
            }, {
                $pull: {
                    toDoListItems: itemId
                }
            }).exec((err, userResult) => {
                if (err) {
                    return cb(err);
                }
    
                cb(null, { success: true });
            });
        });
    }
}

module.exports = toDoListController;