export default SliceData = (data) => {
    let analyseArray = data?.length > 2 ? data.slice(0, 3) : data;
    return analyseArray;
}