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
    createCategory: {
        url:`${backendDomain}/api/create-Category`,
        method: "post"
    },
    categoryList: {
        url:`${backendDomain}/api/category-list`,
        method: "get"
    },
    updateCategory: {
        url:`${backendDomain}/api/update-category`,
        method: "put"
    },
    deleteCategory: {
        url:`${backendDomain}/api/delete-category`,
        method: "delete"
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
        method: "get"
    },
    


    
}

export default SummaryApi