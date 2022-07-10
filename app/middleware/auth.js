import log from 'loglevel';
import db from '../db';

const authMiddleware = (req, res, next) => {
  const userId = req.get('X-User-Id');

  log.debug('\x1b[32m', '[Auth]', 'Headers:', req.rawHeaders, '\x1b[0m');
  log.debug('\x1b[32m', '[Auth]', 'Body:', req.body, '\x1b[0m');

  if (!userId) {
    next();
    return null;
  }

  log.info('\x1b[32m', '[Auth]', 'User ID:', userId, '\x1b[0m');

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

  return null;
};

export default authMiddleware;
