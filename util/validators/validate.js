export const StringContainsNumber = (data) => {
    return /\d/.test(data)
}


export const StringContainsOnlyNumber = (data) => {
    return /^\d+$/.test(data)
}


export const ContainsSpecialChars = (str) => {
    const specialChars = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    return specialChars.split('').some((specialChar) => str.includes(specialChar));
}

export const ObjectPropHasAllValues = (obj) => {
    for (const key in obj) {
        if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
            return true;
        }
    }
    return true;
}


export const IsvalidEmail = (email)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

