import axiosApi from "../utils/axiosApi";

export const sendMail = async (email: string) =>
    await axiosApi.post("/verify", {
        email: email
    });


export const checkCode = async (email: string, code: string) =>
    await axiosApi.post("/verify/code", {
        email: email,
        code: code
    });


export const signup = async (email: string, password: string, code: string) =>
    await axiosApi.post("/verify/signup", {
        email: email,
        password: password,
        code: code,
    });


export const loginApi = async (email: string, password: string) =>
    await axiosApi.post("/member/login", {
        email: email,
        password: password
    }, { withCredentials: true });

export const logoutApi = async (email: string) =>
    await axiosApi.post("/member/logout", {
        email: email
    }, { withCredentials: true });


export const checkMemberInfo = async () =>
    await axiosApi.get("/member/info");


export const testApi = async () => await axiosApi.get("/member/test");