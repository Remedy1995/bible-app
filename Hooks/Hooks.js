import React, { useMemo } from "react";
import { AllCustomersService, DepositorInfoService } from "../Services/Services";
import { fetchUsers,clearFetchedUsers } from "../redux/Reducers/Users";
import { updateAccountBalance } from "../redux/Reducers/Accounts";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { AllTransactionService } from "../Services/Services";
import { fetchTransactions } from "../redux/Reducers/Transactions";

export const UserNameHooks = () => {
    const dispatch = useDispatch();
    const usersInformation = useSelector((state) => state.Allusers.users);
    const allUsers = useSelector((state) => state.Allusers.registerUsers);
    // console.log('all created', allUsers)
    const [errorUsername, setErrorUsername] = useState("")
    useEffect(() => {
        dispatch(clearFetchedUsers());
        console.log('before loading',usersInformation)
        AllCustomersService().then((customers) => {
            // console.log('my', customers)
            dispatch(fetchUsers(customers));
        }).catch(error => {
            // console.log('log', setErrorUsername(error));
        })
    }, [])

    //allusers Array 
    //const usersInformation = useSelector((state) => state.Allusers.users);

    //specific logged in user array
    const authenticated = useSelector((state) => state.Allusers.authenticated);

    //This function get the specific user data using the phone number of the logged in user
    var fetchSpecificUserData = usersInformation?.length > 0 && usersInformation[usersInformation?.length - usersInformation?.length]?.filter((user) => {
        return user && user?.phone?.includes(authenticated?.map(data => data.phone));
    })
    // fetchSpecificUserData.length === 0 ? allUsers : fetchSpecificUserData;
    const getUserName = fetchSpecificUserData && fetchSpecificUserData?.map((data) => data?.username);

    const getAccountNumber = fetchSpecificUserData && fetchSpecificUserData?.map((data) => data.accountnumber);
    const accountNumber = getAccountNumber && getAccountNumber.find((name) => name);
    // console.log('ath', authenticated);

    // console.log('specific user ', fetchSpecificUserData);
    return { fetchSpecificUserData, getUserName, errorUsername }


}





export const AccountNumberHooks = () => {
    //allusers Array 
    const usersInformation = useSelector((state) => state.Allusers.users);

    //specific logged in user array
    const authenticated = useSelector((state) => state.Allusers.authenticated);

    //This function get the specific user data using the phone number of the logged in user
    const fetchSpecificUserData = usersInformation?.length > 0 && usersInformation && usersInformation[usersInformation?.length - usersInformation?.length]?.filter((user) => {
        return user?.phone?.includes(authenticated?.map(data => data.phone));
    })

    //get accountnumber
    //const accountNumber= getUserName[getUserName?.length - getUserName?.length];
    const getAccountNumber = fetchSpecificUserData && fetchSpecificUserData?.map((data) => data.accountnumber);
    const accountNumber = getAccountNumber && getAccountNumber.find((name) => name)
    return { accountNumber };
}

export const DepositorInfoHooks = () => {
    const dispatch = useDispatch();
    var [balance, setbalance] = useState("");
    const [balanceError, setBalanceError] = useState("");
    const { accountNumber } = AccountNumberHooks();
    const accountObject = {
        accountnumber: accountNumber
    }

    useEffect(() => {
        if (accountNumber !== false && accountNumber?.length > 0) {
            DepositorInfoService(accountObject).then(data => {
                let userBalance = data.map((value) => value.amount);
                setbalance(userBalance);
            }).catch(error => {
                console.log('error', error);
                setBalanceError(error);
            });
        }

    }, [accountNumber])


    return { balance, balanceError };

}


export const UpdateCustomerBalance = () => {
    const [digitalBalance, setDigitalBalance] = useState("");
    const { accountNumber } = AccountNumberHooks();

    console.log('hi', accountNumber);

    const { balance, balanceError } = DepositorInfoHooks();
    //  console.log('judege bala', balance)

    const customerAccount = useSelector((state) => state.AllAccounts.customerAccountBalance);
    // console.log('my balanceF', customerAccount)
    // const currentBalance = balance && balance?.map(data => data.amount);
    // console.log('balance', currentBalance[0]);
    //  console.log('hi balance ')
    useEffect(() => {
        if (customerAccount.length < 1) {
            //no transactions made 
            console.log('HELLO WORLD')
            !balance ? setDigitalBalance(0.00) : setDigitalBalance(balance);
        }
        else {
            //check if username records exists in the array;


            const checkAccount = customerAccount.filter((data) => data.accountnumber === accountNumber);
            console.log('my user', checkAccount.length)

            if (checkAccount.length === 0) {
                const checkBalance = checkAccount?.map((data) => data.balance);
                console.log('check balances', checkBalance);
                // const lastUpdate = checkBalance.reverse().at(0);
                // console.log('lastUpdate', lastUpdate.at(0));
                // console.log('new applicant',checkAccount)

                balance.length > 1 || checkBalance.length > 1 ? setDigitalBalance("0.00") : setDigitalBalance(balance);

            }
            else {
                const checkBalance = checkAccount?.map((data) => data.balance);
                console.log('check balances', checkBalance);
                const lastUpdate = checkBalance?.reverse().at(0);
                console.log('debug', lastUpdate)
                console.log('lastUpdate', lastUpdate?.at(0));
                console.log('new applicant', checkAccount)
                !checkAccount ? setDigitalBalance("Loading") : setDigitalBalance(lastUpdate);
            }
        }

    }, [customerAccount, balance])
    return { digitalBalance };
}




export const AllUsersHooks = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    useEffect(() => {
        AllCustomersService().then((customers) => {
            // console.log('my', customers)
            dispatch(fetchUsers(customers));
        }).catch(error => {
            console.log('log', setError(error));
        })
    }, [])

    const Allusers = useSelector((state) => state.Allusers.users);
    return { Allusers, error };
}





export const AllTransactionHooks = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState("");
    useEffect(() => {
        AllTransactionService().then((transaction) => {
            //  console.log('my', transaction)
            dispatch(fetchTransactions(transaction));
        }).catch(error => {
            console.log('log', setError(error));
        })
    }, [AllTransactions])

    var AllTransactions = useSelector((state) => state.Transactions.allTransactions);
    return { AllTransactions, error };
}


export const UpdateAdminBalanceHooks = () => {
    const [currentAdminBalance, setCurrentAdminBalance] = useState("");
    //This code updates our admin balance first check if we have amount balance in our array if no data 
    //exist in that array we go into our transactions array and fetch the data in there and display 
    const { AllTransactions } = AllTransactionHooks();
    const AllDepositsMade = AllTransactions && AllTransactions[0]?.filter((data) => data.transactiondetails?.split(' ').includes('deposited')).map((data) => data.amount);
    console.log('All Deposits that has been made', AllDepositsMade);

    const AllWithdrawalsMade = AllTransactions && AllTransactions[0]?.filter((data) => !data.transactiondetails?.split(' ').includes('deposited')).map((data) => data.amount);
    console.log('all withdrawals', AllWithdrawalsMade);

    const sumOfAllDepositsMade = AllDepositsMade?.reduce((a, b) => a + b, 0);
    const sumOfAllWithdrawalsMade = AllWithdrawalsMade?.reduce((a, b) => a + b, 0);
    console.log('all sum Deposits', sumOfAllDepositsMade);
    console.log('all withdrawals made', sumOfAllWithdrawalsMade);

    //checking currentBalance 
    const currentOnlineBalance = sumOfAllDepositsMade - sumOfAllWithdrawalsMade;

    const AdminOfflineAccount = useSelector((state) => state.AllAccounts.adminAccountBalance);
    console.log('data inside AdminOffline', AdminOfflineAccount)
    useEffect(() => {
        if (AdminOfflineAccount?.length < 1) {
            setCurrentAdminBalance(currentOnlineBalance);
            console.log('our offline copy has no data')
        }
        else {
            console.log('our offline data has a copy of data')

            const AllOfflineDeposits = AdminOfflineAccount && AdminOfflineAccount?.filter((data) => data.transactionType === 'deposit').map((value) => value.amount);
            console.log('All Off that has been made', AllOfflineDeposits);
            const AllOfflineWithdrawals = AdminOfflineAccount && AdminOfflineAccount?.filter((data) => data.transactionType === 'withdrawals').map((value) => value.amount);
            console.log('all off withdrawals', AllOfflineWithdrawals)

           const  totalSumDep  = AllOfflineDeposits?.reduce((a, b) => a + Number(b), 0);
            const totalSumWith = AllOfflineWithdrawals?.reduce((a, b) => a + Number(b), 0);

            const finalBalance = totalSumDep - totalSumWith;
            const offlineBalance = currentOnlineBalance + (finalBalance);
            setCurrentAdminBalance(offlineBalance);
          

        }

    }, [AdminOfflineAccount, currentAdminBalance, AllTransactions])

    return { currentAdminBalance };

}