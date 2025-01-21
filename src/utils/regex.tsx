export const checkEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.match(regex);
}

export const checkPassword = (password: string) => {
    const regex = "^(?=.*[a-zA-Z])(?=.*\\d|.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.{8,16}).*|^(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.{8,}).*$";
    return password.match(regex);
}