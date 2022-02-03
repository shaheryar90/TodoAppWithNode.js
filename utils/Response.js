module.exports = {
    success: (status, data) => {
        return {
            success: true,
            status,
            data
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
