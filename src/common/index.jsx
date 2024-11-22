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
    addStaff: {
        url:`${backendDomain}/api/add-staff`,
        method: "post"
    },
    updateStaff: {
        url:`${backendDomain}/api/update-staff`,
        method: "put"
    },
    deleteStaff: {
        url:`${backendDomain}/api/delete-staff`,
        method: "delete"
    },
    createProduct: {
        url:`${backendDomain}/api/create`,
        method: "post"
    },
    
    allProduct: {
        url:`${backendDomain}/api/all-product`,
        method: "post"
    },
    updateProduct: {
        url:`${backendDomain}/api/update-product`,
        method: "put"
    },
    deleteProduct: {
        url:`${backendDomain}/api/delete-product`,
        method: "delete"
    },
    orderProduct: {
        url:`${backendDomain}/api/orders`,
        method: "post"
    },
    customers: {
        url:`${backendDomain}/api/customers`,
        method: "post"
    },
    allOrders: {
        url:`${backendDomain}/api/all-orders`,
        method: "post"
    },
    


    
}

export default SummaryApi