const ExpenseSchema= require("../models/expenseModel");

exports.addExpense = async(req , res )=>{
       const {title,amount,category,description,date} = req.body;
       const income = ExpenseSchema({
            title,amount,category,description,date
       })

       try {
        
            if(!title || !amount || !category || !description || !date){
                return res.status(400).json({message:"All fields required" })
            }
            if(amount<0 || !amount==='number'){
                return res.status(400).json({message:"income should be positive number" })
                
            }
            await income.save()
            res.status(200).json({message:"expense added"})

       } catch (error) {
            res.status(500).json({message:'server error'})
       }

       console.log(income)
}

exports.getExpenses = async(req,res)=>{

    try {
        const expense = await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

exports.deleteExpense = async(req , res )=>{
        const {id} = req.params;
        console.log(req.params)
        ExpenseSchema.findByIdAndDelete(id)
        .then((expense)=>{
            res.status(200).json({message : "expense deleted"})
        })
        .catch((error)=>{
            res.status(500).json({message:'server error'})
        })
   
}