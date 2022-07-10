import { parse as parseUUID } from 'uuid';
import db from '../db';

const authMiddleware = (req, res, next) => {
  const userId = req.get('X-User-Id');
  if (!userId) {
   // res.status(401).json({ error: 'Unauthorized ' });
   
    return;
  }
 parseUUID(userId);
  //try {
  //  parseUUID(userId);
 // } catch (e) {
    //res.status(401).json({ error: 'Invalid userId' });
   // return;
  //}

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
