import db from '../db';

const authMiddleware = (req, res, next) => {
    const userId = req.get('X-User-Id');

    if (!userId) {
        next();
        return null;
    }

    console.log(userId);

    db.user.findOrCreate({
        where: {
            uid: userId,
        },
    }).then(([user]) => {
        req.user = {
            uid: user.uid,
        };
        next();
    }).catch(next);
};

export default authMiddleware;
