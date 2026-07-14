export const createAccount = async (req, res) => {
    try{
         let accountNumber,existingAccount;
         const userId = req.user.id
        while(true)
        {
             accountNumber = Math.floor(Math.random() * 1e10).toString();
            existingAccount = await prisma.accounts.findUnique({
                where: {
                    account_number: accountNumber
                }
            });
            if(!existingAccount){
                break;
            }
        }
         const newAccount = await prisma.accounts.create({
        data:{
            user_id : userId,
            account_number: accountNumber
        }
    });
    return res.status(201).json({
    message: "New Account created successfully",
    account: newAccount
});
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getAccounts = async (req,res) => {
    try{
         const userId = req.user.id;
  const accounts = await prisma.accounts.findMany({
    where: {
        user_id : userId
    }
  })
   return res.status(200).json({
    message: "Accounts fetched successfully",
    accounts
});
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}

export const depositMoney = async (req,res) =>{
    try{
        const {account_number,amount} = req.body
        const account = await prisma.accounts.findUnique({
            where : {
                account_number  // account is {
                                //     account_number: "1234567890",
                                  //  balance: 1000,
                                   //     user_id: 1
                                     //               }
            }
        })
        if(!account)
        {
            return res.status(404).json({
                message : "Account Not Found"
            })
        }
        if(req.user.id!=account.user_id)// ownership check authorization
        {
            return res.status(403).json({
            message: "Forbidden"
        });
        }
        if(amount<=0)
        {
            return res.status(400).json({
                message : "Amount must be gretarer than 0"
            })
        }
        const newBalance = Number(account.balance) + amount;
        const updatedAccount = await prisma.accounts.update({
    where: {
        account_number
    },
    data: {
        balance: newBalance
    }
});
    return res.status(200).json({
    message: "Money deposited successfully",
    account: updatedAccount
});
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}

export const withdrawMoney = async (req,res) => {
    try{
        const {account_number,amount}=req.body
        const account = await prisma.accounts.findUnique({
            where : {
                account_number
            }
        })
        if(!account)
        {
            return res.status(404).json({
                message : "Account not found"
            })
        }
         if(req.user.id!=account.user_id)// ownership check authorization
        {
            return res.status(403).json({
            message: "Forbidden"
        });
        }
        if(amount<=0)
        {
            return res.status(400).json({
                message : "Amount must be greater than zero"
            })
        }
        if(account.balance < amount )
        {
            return res.status(400).json({ //400 for invalid request 
                    message : "Insufficient Balance"
            })
        }
          const newBalance = Number(account.balance) - amount;
          const updatedAccount = await prisma.accounts.update({
            where: {
                account_number
            },
            data : {
                balance : newBalance
            }
          })
           return res.status(200).json({
    message: "Money withdrawn successfully",
    account: updatedAccount
});
    }catch(error){
        return res.status(500).json({
              message: error.message
        }) 
    }
}

export const transferMoney = async (req, res) => {
    try {
        const {from_account,to_account,amount} = req.body
         const senderAccount = await prisma.accounts.findUnique({
            where : {
                account_number : from_account //finding sender and receiver acc
            }
        })
          const receiverAccount = await prisma.accounts.findUnique({
            where : {
                account_number : to_account
            }
        })
        if(!senderAccount)
        {
             return res.status(404).json({  //checking whether sender exists 
                message : "Sender Account not found"
            })
        }
        if(!receiverAccount)
        {
             return res.status(404).json({
                message : "Receiver Account not found"   //checking whether receiver exists 
            })
        }
        if(from_account==to_account)
        {
             return res.status(403).json({   
            message: "Forbidden"
        });
        }
         if(req.user.id!=senderAccount.user_id)// ownership check authorization
        {
            return res.status(403).json({
            message: "Forbidden"
        });
        }
         if(amount<=0)
        {
            return res.status(400).json({
                message : "Amount must be gretarer than 0"
            })
        }
        if(Number(senderAccount.balance)<amount)  //Number we write because of PRISMA decimal type decimal is there not int for good maths we use Number
        {
             return res.status(400).json({ //400 for invalid request 
                    message : "Insufficient Balance"
            })
        }
        await prisma.$transaction(async (tx) => { //new here tx is transaction client and inside it you will use tx
            const senderNewBalance = Number(senderAccount.balance) - amount;
           await tx.accounts.update({
                where:{
                    account_number : from_account
                },
                data : {
                    balance : senderNewBalance
                }
            })
             const receiverNewBalance = Number(receiverAccount.balance) + amount;
             await tx.accounts.update({
                where : {
                    account_number : to_account
                },
                data : {
                    balance : receiverNewBalance
                }
             })
             await tx.transactions.create({
                data:{
                    type : "TRANSFER",
                    amount : amount ,
                    from_account_id : senderAccount.id ,        //    senderAccount = {
                    to_account_id : receiverAccount.id                                                    // id: 1,
                                                                        // account_number: "1234567890",
                                                                        // balance: 5000,
                                                                        // user_id: 10
                                                                                // }
                }
             })

             



});
return res.status(200).json({
    message: "Money transferred successfully"
});
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
} 

