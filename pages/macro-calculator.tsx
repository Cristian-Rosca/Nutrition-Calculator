import { Box, Button, Divider, Heading, Input, Select, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../components/Footer";

const MacroCalculator = () => {
    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    const handleUserBodyWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserBodyWeight(Number(e.target.value))

    const [userDailyCalorieTarget, setUserDailyCalorieTarget] = React.useState<number>(0)
    const handleUserDailyCalorieTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserDailyCalorieTarget(Number(e.target.value))

    const [userGoal, setUserGoal] = React.useState<string>('')
    const handleUserGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserGoal(e.target.value)

    const [userProteinPerKG, setUserProteinPerKG] = React.useState<number>(2.2)
    const handleUserProteinPerKGChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserProteinPerKG(Number(e.target.value))

    const [userPercentageOfFats, setUserPercentageOfFats] = React.useState<number>(.25)
    const handleUserPercentageOfFatsChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserPercentageOfFats(Number(e.target.value))

    const [userFibrePer1000kcal, setUserFibrePer1000kcal] = React.useState<number>(14)
    const handleUserFibrePer1000kcalChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserFibrePer1000kcal(Number(e.target.value))

    const [userProteinTarget, setUserProteinTarget] = React.useState<number>(0)
    const handleUserProteinTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserProteinTarget(Number(e.target.value))

    const [userCarbTarget, setUserCarbTarget] = React.useState<number>(0)
    const handleUserCarbTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserCarbTarget(Number(e.target.value))

    const [userFatTarget, setUserFatTarget] = React.useState<number>(0)
    const handleUserFatTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserFatTarget(Number(e.target.value))

    const [userFibreTarget, setUserFibreTarget] = React.useState<number>(0)
    const handleUserFibreTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserFibreTarget(Number(e.target.value))

    const [userFluidTarget, setUserFluidTarget] = React.useState<number>(0)
    const handleUserFluidTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserFluidTarget(Number(e.target.value))

    const [userFruitTarget, setUserFruitTarget] = React.useState<number>(0)
    const handleUserFruitTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserFruitTarget(Number(e.target.value))

    const [userVegTarget, setUserVegTarget] = React.useState<number>(0)
    const handleUserVegTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserVegTarget(Number(e.target.value))



    function calculateMacroRecommendations(dailyCalorieTarget: number, bodyWeightInKG: number, proteinPerKG: number, percentageOfFats: number, fibrePer1000kcal: number, goal: string) {
        // const calorieTarget = dailyCalorieTarget;
        const proteinTarget: number = bodyWeightInKG * proteinPerKG;
        const fatTarget: number = (dailyCalorieTarget * percentageOfFats) / 9
        const carbTarget: number = (dailyCalorieTarget - (proteinTarget * 4) - (fatTarget * 9)) / 4
        const fibreTarget: number = (dailyCalorieTarget / 1000) * fibrePer1000kcal
        const fluidTarget: number = bodyWeightInKG / 23
        const fruitServingsRecommendation: number = goal === "Dieting" ? Math.ceil(dailyCalorieTarget / 500) : Math.ceil(dailyCalorieTarget / 1000)
        const vegServingsRecommendation: number = goal === "Dieting" ? Math.ceil(dailyCalorieTarget / 500) : Math.ceil(dailyCalorieTarget / 1000)
        
        setUserProteinTarget(Math.floor(proteinTarget))
        setUserFatTarget(Math.floor(fatTarget))
        setUserCarbTarget(Math.floor(carbTarget))
        setUserFibreTarget(Math.floor(fibreTarget))
        setUserFluidTarget(Math.round(fluidTarget * 10) / 10)
        setUserFruitTarget(Math.floor(fruitServingsRecommendation))
        setUserVegTarget(Math.floor(vegServingsRecommendation))
    }

    useEffect(() => {
        if(userBodyWeight !== 0 && userDailyCalorieTarget !== 0 && userGoal != ''){
            calculateMacroRecommendations(userDailyCalorieTarget, userBodyWeight, userProteinPerKG, userPercentageOfFats, userFibrePer1000kcal, userGoal)
        }
        
    }, [userBodyWeight, userDailyCalorieTarget, userGoal, userProteinPerKG, userPercentageOfFats, userFibrePer1000kcal]);

    interface User {
        stats : {
            userBodyWeight : number,
            userHeightInCM : number,
            userAge : number,
            userSex : string,
            userPhysicalActivityLevel : number,
            userRMR : number, 
            userMaintenanceCalories : number
            userBodyFatPercentage : number
        },
    }
    
    const [user, setUser] = React.useState<User>({ stats : {
        userBodyWeight : 0,
        userHeightInCM : 0,
        userAge : 0,
        userSex : '',
        userPhysicalActivityLevel : 0,
        userRMR : 0, 
        userMaintenanceCalories : 0,
        userBodyFatPercentage : 0
    }})
    
    
    
    useEffect(() => {
        const data = window.localStorage.getItem('User');
        if (data) {
            let lsUser= JSON.parse(data)
            setUser(lsUser)
            setUserBodyWeight(Number(lsUser.stats.userBodyWeight))
            setUserGoal(lsUser.stats.userGoal)
        }
      }, []);
    
    interface Stats {
        userBodyWeight : number,
        userHeightInCM : number,
        userAge : number,
        userSex : string,
        userPhysicalActivityLevel : number,
        userRMR : number, 
        userMaintenanceCalories : number
        userBodyFatPercentage : number
    }
    
    
    const userStats : Stats = {
        userBodyWeight : userBodyWeight,
        userHeightInCM : user.stats.userHeightInCM,
        userAge : user.stats.userAge,
        userSex : user.stats.userSex,
        userPhysicalActivityLevel : user.stats.userPhysicalActivityLevel,
        userRMR : user.stats.userRMR, 
        userMaintenanceCalories : user.stats.userMaintenanceCalories,
        userBodyFatPercentage : user.stats.userBodyFatPercentage
    }
    
    
    useEffect(() => {
            user.stats = userStats
            window.localStorage.setItem('User', JSON.stringify(user));
      }, [userStats]);



    return (
        <>
            <Head>
                <title>Nutrition Tool | Maintenance Calculator</title>
                <meta />
            </Head>
            <Box display={"flex"} justifyContent={"center"} >
                <Box display={"flex"} flexDirection={"column"} p={10} rounded={6} position={"relative"} alignItems={"center"}>
                    <Heading color={"white"} mb={"5"}>Calculate Daily Macro Target</Heading>
                    <Box display={"flex"} flexDirection={"column"} width="50%">
                        <Text color={"white"} alignSelf={"start"} mb='8px'>Body Weight in KG:</Text>
                        <Input mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
                        <Text color={"white"} mb='8px'>Daily Calorie Target:</Text>
                        <Input mb={3} variant={"outlined"} value={userDailyCalorieTarget} onChange={handleUserDailyCalorieTargetChange}></Input>
                        <Text color={"white"} mb='8px'>Your Goal:</Text>
                        <Select bg='white' placeholder="Select from dropdown" mb={3} onChange={handleUserGoalChange}>
                            <option value='Gaining'>Lean Gaining</option>
                            <option value='Dieting'>Dieting</option>
                        </Select>
                        <Text color={"white"} alignSelf={"start"} mb='8px'>Protein per KG:</Text>
                        <Input mb={3} variant={"outlined"} value={userProteinPerKG} onChange={handleUserProteinPerKGChange} ></Input>
                        <Text color={"white"} alignSelf={"start"} mb='8px'>Percentage of Fats:</Text>
                        <Input mb={3} variant={"outlined"} value={userPercentageOfFats} onChange={handleUserPercentageOfFatsChange} ></Input>
                        <Text color={"white"} alignSelf={"start"} mb='8px'>Fibre per 1000kcal:</Text>
                        <Input mb={3} variant={"outlined"} value={userFibrePer1000kcal} onChange={handleUserFibrePer1000kcalChange} ></Input>
                    </Box>
                    <Divider mb={"3"} mt={"3"} orientation='horizontal' />
                    <Heading color={"white"} mb={"3"} size='lg'> Results</Heading>
                    <Text color={"white"} fontSize='lg'> Your Daily Calorie Target is: {userDailyCalorieTarget}kcal</Text>
                    <Text color={"white"} fontSize='lg'> Your Protein Target is: {userProteinTarget}g</Text>
                    <Text color={"white"} fontSize='lg'> Your Carb Target is: {userCarbTarget}g</Text>
                    <Text color={"white"} fontSize='lg'> Your Fat Target is: {userFatTarget}g</Text>
                    <Text color={"white"} fontSize='lg'> Your Fibre Target is: {userFibreTarget}g</Text>
                    <Text color={"white"} fontSize='lg'> Your Fluid Target is: {userFluidTarget} litres</Text>
                    <Text color={"white"} fontSize='lg'> Recommended daily fruit servings: {userFruitTarget} servings</Text>
                    <Text color={"white"} fontSize='lg'> Recommended daily veg servings: {userVegTarget} servings</Text>
                    <Divider mb={"3"} mt={"3"} orientation='horizontal' />
                </Box>
            </Box>
            {/*
            footer issue workaround
            */}
            {/* <Box mt={"10rem"}>

            <Footer />
            </Box> */}


        </>

    );
}

export default MacroCalculator;