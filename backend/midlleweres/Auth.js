const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized: JWT token is required' });
    }
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized: Bearer token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized: Invalid JWT token' });
    }
};
module.exports = ensureAuthenticated;
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvcmsxMkBnbWFpbC5jb20iLCJfaWQiOiI2NzBiNzk1YjllMWRkNzQxODU4ZTg5ZGEiLCJpYXQiOjE3Mjg4MDU1NDcsImV4cCI6MTcyODg5MTk0N30.x3yi-BBk4RxVYkWkO11E3W--3-Ci8mFSDyJh7F6knlM"