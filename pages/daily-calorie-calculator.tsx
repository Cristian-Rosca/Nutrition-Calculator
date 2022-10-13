import React from "react";

const DailyCalorieCalculator = () => {

    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    const handleUserBodyWeightChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserBodyWeight(Number(e.target.value))
    
    const [userSex, setUserSex] = React.useState<string>('')
    const handleUserSexChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserSex(e.target.value)
    
    const [userBodyFatPercentage, setUserBodyFatPercentage] = React.useState<number>(0)
    const handleUserBodyFatPercentageChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserBodyFatPercentage(Number(e.target.value))
    
    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)
    
    const [userGoal, setUserGoal] = React.useState<string>('')
    const handleUserGoalChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserGoal(e.target.value)
    
    const [availableUserRatesOfWeightChange, setAvailableUserRatesOfWeightChange] = React.useState<number[]>([])
    
    const [userRateOfWeightChange, setUserRatesOfWeightChange] = React.useState<number>(0)
    const handleUserRatesOfWeightChangeChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserRatesOfWeightChange(Number(e.target.value))

    const [userDailyCalorieTarget, setUserDailyCalorieTarget] = React.useState<number>(0)


    function findAvailableUserRatesOfWeightChange(sex: string, goal : string, bodyFatPercentage: number) {
        if(sex === "Male"){
            if (goal === "gaining"){
                setAvailableUserRatesOfWeightChange([0.005, 0.01, 0.015])
            }
            else if (goal === "dieting"){
                if (bodyFatPercentage <= 10){
                    setAvailableUserRatesOfWeightChange([-0.02])
                }
                else if (bodyFatPercentage <= 15){
                    setAvailableUserRatesOfWeightChange([-0.02, -0.03])
                }
                else if (bodyFatPercentage >= 16){
                    setAvailableUserRatesOfWeightChange([-0.02, -0.03, -0.04])
                }
            }
        }
        else if (sex === "Female"){
            if (goal === "gaining"){
                setAvailableUserRatesOfWeightChange([0.005, 0.01, 0.015])
            }
            else if (goal === "dieting"){
                if (bodyFatPercentage <= 20){
                    setAvailableUserRatesOfWeightChange([-0.02])
                }
                else if (bodyFatPercentage <= 27){
                    setAvailableUserRatesOfWeightChange([-0.02, -0.03])
                }
                else if (bodyFatPercentage >= 28){
                    setAvailableUserRatesOfWeightChange([-0.02, -0.03, -0.04])
                }
            }
        }

    }
    
    findAvailableUserRatesOfWeightChange(userSex, userGoal, userBodyFatPercentage)

    function calculateDailyCalorieTarget(bodyWeightInKG: number, maintenanceCalorieIntake: number, rateOfWeightChange: number){
        const kcalsPerKG : number = 7700
        const goalWeightChange : number = bodyWeightInKG * rateOfWeightChange
        const monthlyCalorieDifference : number = goalWeightChange * kcalsPerKG
        const dailyCalorieDifference : number = monthlyCalorieDifference / 30
        const dailyCalorieTarget : number = maintenanceCalorieIntake + dailyCalorieDifference
        
        setUserDailyCalorieTarget(dailyCalorieTarget)
    }

    calculateDailyCalorieTarget(userBodyWeight, userMaintenanceCalories, userRateOfWeightChange)



    return ( 
        <>
        
        </>
     );
}
 


export default DailyCalorieCalculator;