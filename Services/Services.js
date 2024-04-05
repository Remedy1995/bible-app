import axiosInstance from "../util/Interceptor";


export const AllCustomersService = async () => {
    const response = await axiosInstance.get('/searchuser/searchuser');
    return response.data;
}


export const MakeDepositService = async ({ payload }) => {
    console.log('payload data', payload);
    const response = await axiosInstance.post('/makedeposit/deposit', payload);
    return response.data;
}


export const MakeWithdrawalService = async ({ payload }) => {
    console.log('payload data', payload);

    const response = await axiosInstance.post('/makewithdrawal/makewithdrawal', payload);
    return response.data;
}

export const DepositorInfoService = async (payload) => {
    const response = await axiosInstance.post('/depositorinfo/depositorinfo', payload);
    return response.data;
}


export const RegisterUserService = async (data) => {
    console.log('register', data);
    const response = await axiosInstance.post('/user/createuser', data);
    return response.data;
}


export const LoginUserService = async (data) => {
    console.log('login', data);
    const response = await axiosInstance.post('/user/userlogin',data);
    return response.data;
}

export const AllTransactionService = async () => {
    const response = await axiosInstance.get('/transaction/transaction');
    return response.data;
}

export const ChangeUserPasswordService = async (id ,data) => {
    const response = await axiosInstance.post('/changeuserpassword/changeuserpassword'+id , data);
    return response.data;
}

export const MomoPaymentService = async (data) => {
    const response = await axiosInstance.post('/makepayment/momo', data);
    return response;
  
}


export const VerifyOtpService = async (data) => {
    const response = await axiosInstance.post('/makepayment/otp', data);
    return response;
  
}


export const VerifyTransactionService = async (data) => {
    const response = await axiosInstance.post('/makepayment/verification', data);
    return response;
  
}


export const SendOtpService = async (data) => {
    const response = await axiosInstance.post('/phonesms/sendotp', data);
    return response;
  
}

export const VerifyPhoneOtpService = async (data) => {
    const response = await axiosInstance.post('/phonesms/verifyotp', data);
    return response;
  
}


export const sendSMSService = async (data)=>{
    const response = await axiosInstance.post('/phonesms/sendmessage',data);
    return response;
}