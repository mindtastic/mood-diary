import { parse as parseUUID } from 'uuid';
import db from '../db';

const authMiddleware = (req, res, next) => {
    const userId = req.get('X-User-Id');
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized ' });
    }

    try {
        parseUUID(userId);
    } catch (e) {
        return res.status(401).json({ error: 'Invalid userId' });
    }

    db.user.findOrCreate({
        where: {
            uid: userId
        }
    }).then(([user]) => {
        req.user = {
          uid: user.uid,
        };
        next();
      }).catch (next);
};

export default authMiddleware;
