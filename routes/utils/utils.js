function sendResponse(TAG, state, data, res){
    if (state){
        console.log(TAG, "Everithing goes OK");
        res.json(data);
    }else{
        console.log(TAG, "Something goes wrong");
        res.json(data);
    }
}

module.exports.sendResponse = sendResponse;