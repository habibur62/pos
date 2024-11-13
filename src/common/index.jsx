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
    createProduct: {
        url:`${backendDomain}/api/create`,
        method: "post"
    },
    allUsers: {
        url:`${backendDomain}/api/all-users`,
        method: "get"
    },


    
}

export default SummaryApi