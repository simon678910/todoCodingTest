const router = require('express').Router();
const ToDoListController = require('../controller/toDoListController');
const toDoListController = new ToDoListController();

router.post('/todolist/:userId', (req, res, next) => {
    const { userId } = req.params;
    const item = req.body;

    toDoListController.addItemToUserToDoList(userId, item, (err, result) => {
        if (err) {
            return next(err);
        }

        res.json(result);
    });
});

router.get('/todolist/:userId', (req, res, next) => {
    const { userId } = req.params;
    
    toDoListController.getToDoListByUserId(userId, (err, result) => {
        if (err) {
            return next(err);
        }

        res.json({success: true, result});
    });
});

router.put('/todolist/:userId/:itemId', (req, res, next) => {
    const { userId, itemId } = req.params;
    const updatedItem = req.body
    
    toDoListController.updateToDoListItemById(userId, itemId, updatedItem, (err, result) => {
        if (err) {
            return next(err);
        }

        res.json({success: true, result});
    });
});

router.delete('/todolist/:userId/:itemId', (req, res, next) => {
    const { userId, itemId } = req.params;

    toDoListController.removeItemFUserToDoList(userId, itemId, (err, result) => {
        if (err) {
            return next(err);
        }

        res.json(result);
    });
});

module.exports = router;