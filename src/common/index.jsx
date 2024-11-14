const backendDomain = "http://localhost:8080"


const SummaryApi = {
    signUp: {
        url:`${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url:`${backendDomain}/api/signin`,
        method: "post"
    },
    currentUser: {
        url:`${backendDomain}/api/user-details`,
        method: "get"
    },
    logoutUser: {
        url:`${backendDomain}/api/logout`,
        method: "get"
    },
    allUsers: {
        url:`${backendDomain}/api/all-users`,
        method: "get"
    },
    createProduct: {
        url:`${backendDomain}/api/create`,
        method: "post"
    },
    allProduct: {
        url:`${backendDomain}/api/all-product`,
        method: "get"
    },
    updateProduct: {
        url:`${backendDomain}/api/update-product`,
        method: "put"
    },


    
}

export default SummaryApi