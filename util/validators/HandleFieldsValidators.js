import { StringContainsNumber, StringContainsOnlyNumber, ContainsSpecialChars, IsvalidEmail } from '../validators/validate';

export const HandleFieldsFirstName = (forms, data) => {
    let isTouched = false;
    let hasError = false;
    if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
        isTouched = true;
        hasError = true;
    }
    forms(currentData => ({
        ...currentData,
        firstname: data,
        isTouched,
        hasError
    }))
}

export const HandleFieldsLastName = (forms, data) => {
    let isTouched1 = false;
    let hasError1 = false;
    if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
        isTouched1 = true;
        hasError1 = true;
    }
    forms(currentData => ({
        ...currentData,
        lastname: data,
        isTouched1,
        hasError1
    }))
}


export const HandleFieldsPhoneNumber = (forms, data) => {
    let isTouched2 = false;
    let hasError2 = false;
    if (!StringContainsOnlyNumber(data) || isNaN(data)) {
        isTouched2 = true;
        hasError2 = true;
    }
    forms(currentData => ({
        ...currentData,
        phone: data,
        isTouched2,
        hasError2
    }))
}



export const HandleFieldsOccupation = (forms, data) => {
    let isTouched6 = false;
    let hasError6 = false;
    if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
        isTouched6 = true;
        hasError6 = true;
    }
    forms(currentData => ({
        ...currentData,
        occupation: data,
        isTouched6,
        hasError6
    }))
}

export const HandleFieldsAddress = (forms, data) => {
    let isTouched3 = false;
    let hasError3 = false;
    if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
        isTouched3 = true;
        hasError3 = true;
    }
    forms(currentData => ({
        ...currentData,
        address: data,
        isTouched3,
        hasError3
    }))
}





export const HandleFieldsUsername = (forms, data) => {
    let isTouched4 = false;
    let hasError4 = false;
    // if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
    //     isTouched4 = true;
    //     hasError4 = true;
    // }
    forms(currentData => ({
        ...currentData,
        username: data,
        isTouched4,
        hasError4
    }))
}



export const HandleFieldsLoginUsername = (forms, data) => {
    let isTouched = false;
    let hasError = false;
    // if (StringContainsNumber(data) || ContainsSpecialChars(data)) {
    //     isTouched4 = true;
    //     hasError4 = true;
    // }
    forms(currentData => ({
        ...currentData,
        username: data,
        isTouched,
        hasError
    }))
}

export const HandleFieldsEmail = (forms, data) => {
    let isTouched5 = false;
    let hasError5 = false;
    if (!IsvalidEmail(data)) {
        isTouched5 = true;
        hasError5 = true;
    }
    forms(currentData => ({
        ...currentData,
        email: data,
        isTouched5,
        hasError5
    }))
}
export const HandleFieldsCustomerName = (forms, data) => {
    let isTouched = false;
    let hasError = false;
    // if (!StringContainsNumber(data) || !ContainsSpecialChars(data)) {
    //     isTouched = true;
    //     hasError = true;
    // }
    forms(currentData => ({
        ...currentData,
        customerName: data,
        isTouched,
        hasError
    }))
}


export const HandleFieldsAccountNumber = (forms, data) => {
    let isTouched1 = false;
    let hasError1 = false;
    if (ContainsSpecialChars(data)) {
        isTouched1 = true;
        hasError1 = true;
    }
    forms(currentData => ({
        ...currentData,
        accountnumber: data,
        isTouched1,
        hasError1
    }))
}



export const HandleFieldsAmount = (forms, data) => {
    let isTouched2 = false;
    let hasError2 = false;
    if (!StringContainsOnlyNumber(data) || isNaN(data)) {
        isTouched2 = true;
        hasError2 = true;
    }
    forms(currentData => ({
        ...currentData,
        amount: data,
        isTouched2,
        hasError2
    }))
}




export const HandleFieldsUserName = (forms, data) => {
    let isTouched4 = false;
    let hasError4 = false;
    // if ( ContainsSpecialChars(data)) {
    //     isTouched4 = true;
    //     hasError4 = true;
    // }
    forms(currentData => ({
        ...currentData,
        username: data,
        isTouched4,
        hasError4
    }))
}



export const HandleFieldsUserPassword = (forms, data) => {
    let isTouched1 = false;
    let hasError1 = false;
    if (data.length <= 2) {
        isTouched1 = true;
        hasError1 = true;
    }
    forms(currentData => ({
        ...currentData,
        password: data,
        isTouched1,
        hasError1
    }))
}





export const HandleFieldsSearchName = (forms, data) => {
    let isTouched = false;
    let hasError = false;
    if (ContainsSpecialChars(data)) {
        isTouched = true;
        hasError = true;
    }
    forms(currentData => ({
        ...currentData,
        username: data,
        isTouched,
        hasError
    }))
}


export const HandleFieldsSearchAccountNumber = (forms, data) => {
    let isTouched = false;
    let hasError = false;
    if (ContainsSpecialChars(data)) {
        isTouched = true;
        hasError = true;
    }
    forms(currentData => ({
        ...currentData,
        accountnumber: data,
        isTouched,
        hasError
    }))
}

