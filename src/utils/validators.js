export function emailValidation (email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
    return regex.test(email)
}

export function passWordValidation(passWord) {
    return passWord.length >= 6
}