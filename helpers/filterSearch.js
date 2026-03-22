module.exports = (query) => {
    let filterLocation = [{
            name: "",
            selected: ""
        },
        {
            name: "Hà Nội",
            selected: ""
        },
        {
            name: "TP.HCM",
            selected: ""
        },
        {
            name: "Đà Nẵng",
            selected: ""
        }
    ]
    let objectFind = {
        filterLocation: filterLocation,
        title: "",
        location: "",
        regex: ""
    }

    if (query.location) {
        const index = filterLocation.findIndex(item => item.name == query.location);
        filterLocation[index]["selected"] = "selected";
    }
    if (query.keyword) {
        const regex = new RegExp(query.keyword, "i");
        objectFind.regex = regex;
    }
    if (query.location) {
        objectFind.location = query.location;
    }
    return objectFind;
}