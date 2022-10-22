import React from "react"

const RefeedCalculator = () => {
    const [userGoal, setUserGoal] = React.useState<string>('')
    const handleUserGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserGoal(e.target.value)
    
    const [userDailyCalorieTarget, setUserDailyCalorieTarget] = React.useState<number>(0)
    const handleUserDailyCalorieTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserDailyCalorieTarget(Number(e.target.value))

    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)
    const handleUserMaintenanceCaloriesChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserMaintenanceCalories(Number(e.target.value))

    const [userSex, setUserSex] = React.useState<string>('')
    const handleUserSexChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserSex(e.target.value)
    
    const [userBodyFatPercentage, setUserBodyFatPercentage] = React.useState<number>(0)
    const handleUserBodyFatPercentageChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserBodyFatPercentage(Number(e.target.value))

    
    // calculate recommended number of refeed days based on gender and body fat % 
    function calculateNoOfRecommendedRefeedDays(sex : string, bodyFatPercentage : number){
        if (sex === "male"){
            if (bodyFatPercentage <= 11){
                return 3
            }
            else if (bodyFatPercentage >= 12 && bodyFatPercentage <= 19){
                return 2
            }
            else if (bodyFatPercentage >= 20){
                return 1
            }
        }
        else if (sex === "female"){
            if (bodyFatPercentage <= 19){
                return 3
            }
            else if (bodyFatPercentage >= 20 && bodyFatPercentage <= 27){
                return 2
            }
            else if (bodyFatPercentage >= 28){
                return 1
            }
        }
    }


    
    return ( 
        <>
        
        </>
     );
}
 
export default RefeedCalculator;