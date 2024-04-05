const DateFormat = (dateString) => {
    let getDay = parseInt(dateString.getDate());
    let getMonth = parseInt(dateString.getMonth() + 1);
    let getyear = dateString.getFullYear();
    if (getDay < 10) {
        getDay = '0' + getDay;
    }
    if (getMonth < 10) {
        getMonth = '0' + getMonth;
    }
    return getDay + "-" + getMonth + "-" + getyear;
}
export default DateFormat;