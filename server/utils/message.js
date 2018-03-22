let generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

let generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from,
        ulr:`https://www.google.com/maps?q=${longitude},${latitude}`,
        createdAt:new Date().getTime()
    }
};
module.exports = {
    generateMessage,
    generateLocationMessage
};