let moment = require('moment');

let generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

let generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from,
        ulr:`https://www.google.com/maps?q=${longitude},${latitude}`,
        createdAt: moment().valueOf()
    }
};
module.exports = {
    generateMessage,
    generateLocationMessage
};