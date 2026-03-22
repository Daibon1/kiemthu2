module.exports=(objectPagination,query,countJobs)=>{
    const page =parseInt(query.page);
    if(!isNaN(page) && page > 0){
        objectPagination.page = page;
    }
    objectPagination.totalPage = Math.ceil(countJobs / objectPagination.limitItem);
    // console.log(objectPagination.page);
    const skipItem = (objectPagination.page - 1) * objectPagination.limitItem;
    objectPagination.skipItem = skipItem;
    return objectPagination;
}