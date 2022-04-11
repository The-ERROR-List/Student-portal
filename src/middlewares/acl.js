'use strict';
function acl(actions) {
    return async (req, res, next) => {
        try {
            if(req.User.role == 'admin'){
                if (req.User.actions.includes(actions)) {
                    next();
                } else {
                    res.status(403).send('you are not allowed to access this page');
                }
            }else{
                res.status(403).send('you are not admin')
            }
            
        } catch (error) {
            console.error(`${error}`);
            res.status(403).send('you are not allowed to access this page');
        }
    }
}
module.exports = acl;