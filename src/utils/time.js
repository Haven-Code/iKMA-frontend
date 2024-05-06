function convertLessonsToTime(lessons) {
    let time = {
        start: "",
        end: "",
    };
    switch (lessons) {
        case "1,2,3":
        case "1-3":
            time = {
                start: "07:00",
                end: "09:25",
            };
            break;
        case "4,5,6":
        case "4-6":
            time = {
                start: "09:35",
                end: "12:00",
            };
            break;
        case "7,8,9":
        case "7-9":
            time = {
                start: "12:30",
                end: "14:55",
            };
            break;
        case "10,11,12":
        case "10-12":
            time = {
                start: "15:05",
                end: "17:30",
            };
            break;
        case "13,14,15,16":
        case "13-16":
            time = {
                start: "18:00",
                end: "21:15",
            };
            break;
    }
    return time;
}

module.exports = { convertLessonsToTime };
