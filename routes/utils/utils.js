function sendResponse(TAG, state, data, res){
    if (state){
        console.log(TAG, "Everithing goes OK");
        res.status(200).json(data);
    }else{
        console.log(TAG, "Something goes wrong");
        res.status(500).json(data);
    }
}

module.exports.sendResponse = sendResponse;