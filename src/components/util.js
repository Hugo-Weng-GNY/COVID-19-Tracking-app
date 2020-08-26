export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b)=>b.cases - a.cases);

    // sortedData.sort((a, b)=>
    // {
    //     if (a.cases > b.cases) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // });
    // return sortedData;

};