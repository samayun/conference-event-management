function updateFromArray(array, updatedData, delimeter = "_id") {
    let foundData = array.find(p => updatedData[delimeter] === p[delimeter]);
    if (foundData) {
        for (let key in updatedData) {
            if (key) {
                foundData[key] = updatedData[key];
            }
        }
    }

    return array;
}

export default updateFromArray;