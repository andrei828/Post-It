exports.mockData = () => {
    mock = [
        {
            username: "George"
        },
        {
            username: "Ionel"
        },
        {
            username: "Andrei"
        },
        {
            username: "Pintea"
        },
        {
            username: "Florian"
        }
    ]
    
    for (let data of mock)
        (new User(data)).save()
}