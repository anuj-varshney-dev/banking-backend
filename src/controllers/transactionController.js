export const getTransactions = asyncHandler(async (req,res)=>{
    // try{
                const accounts = await prisma.accounts.findMany({
            where :{
                user_id : req.user.id
            }
    })
    const accountIds = accounts.map(account => account.id);
    const transactions = await prisma.transactions.findMany({
    where: {
        OR: [
            {
                from_account_id: {
                    in: accountIds
                }
            },            // OR checks wheteher our id is matching with either from acc or to acc
            {
                to_account_id: {
                    in: accountIds
                }
            }
        ]
    },
    orderBy: {
    created_at: "desc"  //transaction should be seen latest or newest
}
})
return res.status(200).json({
    message: "Transactions fetched successfully",
    transactions
});
    // }catch(error)
    // {
    //          return res.status(500).json({
    //         message: error.message
    //     });
    // }
})