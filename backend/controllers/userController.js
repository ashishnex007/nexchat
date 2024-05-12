const User = require('../schemas/userSchema')

/**
 * @getAllUsers 
 * @endpoint - api? search=user
 */

const getAllUsers = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    try {
        const users = await User.find(keyword);
        console.log(users)
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
};



module.exports = getAllUsers;