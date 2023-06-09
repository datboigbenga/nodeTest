const customApiError = require("../errors")
const checkPermission= (requestUser, resourceUser)=>{
// console.log(requestUser, resourceUser)
// if(requestUser.role === "seller") return;
if(requestUser.userId === resourceUser.toString()) return;

throw new customApiError.unaccessible("unable to access route")
}

module.exports = checkPermission