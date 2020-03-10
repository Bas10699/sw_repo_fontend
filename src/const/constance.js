export const user_token = localStorage.getItem('user_token')

export const sortData = (data, property, proviso) => {
    try{
        if (proviso === true) {
        function compare(a, b) {
            const data_idA = a[property].toString().toLowerCase()
            const data_idB = b[property].toString().toLowerCase()

            let comparison = 0;
            if (data_idA < data_idB) {
                comparison = 1;
            } else if (data_idA > data_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_data = data.sort(compare)
        return sort_data
    }
    else {
        function compare(a, b) {
            const data_idA = a[property].toString().toLowerCase()
            const data_idB = b[property].toString().toLowerCase()

            let comparison = 0;
            if (data_idA > data_idB) {
                comparison = 1;
            } else if (data_idA < data_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_data = data.sort(compare)
        return sort_data
    }
    }
    catch(error){
        console.log("sortData",error)
    }

}