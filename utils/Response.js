module.exports = {
    success: (status, data,message) => {
        return {
            success: true,
            status,
            data,
            message
        }
    },
    failure: (status, message) => {
        return {
            success: false,
            status,
            message
        }
    }
}
