import React from "react"

const RefeedCalculator = () => {
    
    const [userGoal, setUserGoal] = React.useState<string>('')

    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    
    const [userDailyCalorieTarget, setUserDailyCalorieTarget] = React.useState<number>(0)

    // Refeed days are at maintenance intake -> this will be the userRefeedDailyCalorieTarget
    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)

    const [userSex, setUserSex] = React.useState<string>('')
    
    const [userBodyFatPercentage, setUserBodyFatPercentage] = React.useState<number>(0)

    const [userProteinPerKG, setUserProteinPerKG] = React.useState<number>(2.2)

    const [userPercentageOfFats, setUserPercentageOfFats] = React.useState<number>(25)

    const [userFibrePer1000kcal, setUserFibrePer1000kcal] = React.useState<number>(14)

    // protein target is dependent on body weight and will stay the same
    const [userProteinTarget, setUserProteinTarget] = React.useState<number>(0)

    // liquids target is dependent on body weight and will stay the same
    const [userFluidTarget, setUserFluidTarget] = React.useState<number>(0)
    
    const [userNumberOfRefeedDays, setUserNumberOfRefeedDays] = React.useState<number>(0)

    const [userRefeedCarbTarget, setUserRefeedCarbTarget] = React.useState<number>(0)

    const [userRefeedFatTarget, setUserRefeedFatTarget] = React.useState<number>(0)

    const [userRefeedFibreTarget, setUserRefeedFibreTarget] = React.useState<number>(0)

    const [userRefeedFruitTarget, setUserRefeedFruitTarget] = React.useState<number>(0)

    const [userRefeedVegTarget, setUserRefeedVegTarget] = React.useState<number>(0)

    const [userLowDayDailyCalorieTarget, setUserLowDayDailyCalorieTarget] = React.useState<number>(0)

    const [userLowDayCarbTarget, setUserLowDayCarbTarget] = React.useState<number>(0)

    const [userLowDayFatTarget, setUserLowDayFatTarget] = React.useState<number>(0)

    const [userLowDayFibreTarget, setUserLowDayFibreTarget] = React.useState<number>(0)

    const [userLowDayFruitTarget, setUserLowDayFruitTarget] = React.useState<number>(0)

    const [userLowDayVegTarget, setUserLowDayVegTarget] = React.useState<number>(0)


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


    function calculateReefeedMacroRecommendations(dailyCalorieTarget: number, bodyWeightInKG: number, proteinTarget: number, percentageOfFats: number, fibrePer1000kcal: number, goal: string) {
        const fatTarget: number = (dailyCalorieTarget * (percentageOfFats / 100)) / 9
        const carbTarget: number = (dailyCalorieTarget - (proteinTarget * 4) - (fatTarget * 9)) / 4
        const fibreTarget: number = (dailyCalorieTarget / 1000) * fibrePer1000kcal
        const fruitServingsRecommendation: number = goal === "Dieting" ? Math.ceil(dailyCalorieTarget / 500) : Math.ceil(dailyCalorieTarget / 1000)
        const vegServingsRecommendation: number = goal === "Dieting" ? Math.ceil(dailyCalorieTarget / 500) : Math.ceil(dailyCalorieTarget / 1000)

        setUserRefeedFatTarget(Math.floor(fatTarget))
        setUserRefeedCarbTarget(Math.floor(carbTarget))
        setUserRefeedFibreTarget(Math.floor(fibreTarget))
        setUserRefeedFruitTarget(Math.floor(fruitServingsRecommendation))
        setUserRefeedVegTarget(Math.floor(vegServingsRecommendation))
    }

    function calculateLowDayMacroRecommendations(userNumberOfRefeedDays: number, bodyWeightInKG: number, proteinTarget: number, percentageOfFats: number, fibrePer1000kcal: number, goal: string) {
        const userNumberOfLowDays = 7 - userNumberOfRefeedDays
        
        const userWeeklyCalorieDeficit = userDailyCalorieTarget - userMaintenanceCalories * 7

        const updatedUserWeeklyCalorieDeficit = userWeeklyCalorieDeficit / userNumberOfLowDays

        const lowDayCalorieIntake = userMaintenanceCalories - (updatedUserWeeklyCalorieDeficit / userNumberOfLowDays)

        const fatTarget: number = (lowDayCalorieIntake * (percentageOfFats / 100)) / 9
        const carbTarget: number = (lowDayCalorieIntake - (proteinTarget * 4) - (fatTarget * 9)) / 4
        const fibreTarget: number = (lowDayCalorieIntake / 1000) * fibrePer1000kcal
        const fruitServingsRecommendation: number = goal === "Dieting" ? Math.ceil(lowDayCalorieIntake / 500) : Math.ceil(lowDayCalorieIntake / 1000)
        const vegServingsRecommendation: number = goal === "Dieting" ? Math.ceil(lowDayCalorieIntake / 500) : Math.ceil(lowDayCalorieIntake / 1000)

        setUserLowDayDailyCalorieTarget(Math.floor(lowDayCalorieIntake))
        setUserLowDayFatTarget(Math.floor(fatTarget))
        setUserLowDayCarbTarget(Math.floor(carbTarget))
        setUserLowDayFibreTarget(Math.floor(fibreTarget))
        setUserLowDayFruitTarget(Math.floor(fruitServingsRecommendation))
        setUserLowDayVegTarget(Math.floor(vegServingsRecommendation))
    }
    
    
    return ( 
        <>
        
        </>
     );
}
 
export default RefeedCalculator;