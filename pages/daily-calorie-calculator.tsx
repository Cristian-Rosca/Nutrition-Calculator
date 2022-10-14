import React, { useEffect } from "react";
import { Divider, Flex, Heading, Input, Select, Text, } from "@chakra-ui/react";
import Head from "next/head";

const DailyCalorieCalculator = () => {

    interface RateOfWeightChange {
        label : string,
        value : number
    }

    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    const handleUserBodyWeightChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserBodyWeight(Number(e.target.value))
    
    const [userSex, setUserSex] = React.useState<string>('')
    const handleUserSexChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserSex(e.target.value)
    
    const [userBodyFatPercentage, setUserBodyFatPercentage] = React.useState<number>(0)
    const handleUserBodyFatPercentageChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserBodyFatPercentage(Number(e.target.value))
    
    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)
    const handleUserMaintenanceCaloriesChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserMaintenanceCalories(Number(e.target.value))
    
    const [userGoal, setUserGoal] = React.useState<string>('')
    const handleUserGoalChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserGoal(e.target.value)
    
    const [availableUserRatesOfWeightChange, setAvailableUserRatesOfWeightChange] = React.useState<RateOfWeightChange[]>([])
    
    const [weightChangeOptionDropdown, setWeightChangeOptionDropdown] = React.useState<JSX.Element[]>([])

    const [userRateOfWeightChange, setUserRatesOfWeightChange] = React.useState<number>(0)
    const handleUserRatesOfWeightChangeChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserRatesOfWeightChange(Number(e.target.value))

    const [userDailyCalorieTarget, setUserDailyCalorieTarget] = React.useState<number>(0)


    const weightChangeLegend = {
        "slowGain" : {label : "Gain 0.5% of your body weight per month (Advanced Trainees)", value : 0.005},
        "mediumGain" : {label : "Gain 1% of your body weight per month (Intermediate Trainees)", value : 0.01},
        "fastGain" : {label : "Gain 1.5% of your body weight per month (Beginner Trainees)", value : 0.015},
        "slowDiet" : {label : "Lose 2% of your body weight per month", value : -0.02},
        "mediumDiet" : {label : "Lose 3% of your body weight per month", value : -0.03},
        "fastDiet" : {label : "Lose 4% of your body weight per month", value : -0.04}
    }

    function findAvailableUserRatesOfWeightChange(sex: string, goal : string, bodyFatPercentage: number) {
       if (sex != '' && goal != '' && bodyFatPercentage != 0){
        console.log('entered function');
        
           if(sex === "Male"){
               if (goal === "Gaining"){
                   setAvailableUserRatesOfWeightChange([weightChangeLegend["slowGain"], weightChangeLegend["mediumGain"], weightChangeLegend["fastGain"]])
                }
                else if (goal === "Dieting"){
                    if (bodyFatPercentage <= 10){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"]])
                    }
                    else if (bodyFatPercentage <= 15){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"], weightChangeLegend["mediumDiet"]])
                    }
                    else if (bodyFatPercentage >= 16){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"], weightChangeLegend["mediumDiet"], weightChangeLegend["fastDiet"]])
                    }
                }
            }
            else if (sex === "Female"){
                if (goal === "Gaining"){
                    setAvailableUserRatesOfWeightChange([weightChangeLegend["slowGain"], weightChangeLegend["mediumGain"], weightChangeLegend["fastGain"]])
                }
                else if (goal === "Dieting"){
                    if (bodyFatPercentage <= 20){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"]])
                    }
                    else if (bodyFatPercentage <= 27){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"], weightChangeLegend["mediumDiet"]])
                    }
                    else if (bodyFatPercentage >= 28){
                        setAvailableUserRatesOfWeightChange([weightChangeLegend["slowDiet"], weightChangeLegend["mediumDiet"], weightChangeLegend["fastDiet"]])
                    }
                }
            }
        }

    }

    useEffect(() => {
        if (userSex != '' && userGoal != '' && userBodyFatPercentage != 0) {    
            findAvailableUserRatesOfWeightChange(userSex, userGoal, userBodyFatPercentage)
        }
    }, [userSex, userGoal, userBodyFatPercentage]);

    
    useEffect(() => {
        
        let weightChangeOptions = availableUserRatesOfWeightChange.map((item, i) => {
        return (
            <option key={i} value={item.value}>{item.label}</option>
        )
        }, this);
        setWeightChangeOptionDropdown(weightChangeOptions)
        
        console.log('options:', weightChangeOptions);
        
    }, [availableUserRatesOfWeightChange]);
    


    function calculateDailyCalorieTarget(bodyWeightInKG: number, maintenanceCalorieIntake: number, rateOfWeightChange: number){
        const kcalsPerKG : number = 7700
        const goalWeightChange : number = bodyWeightInKG * rateOfWeightChange
        const monthlyCalorieDifference : number = goalWeightChange * kcalsPerKG
        const dailyCalorieDifference : number = monthlyCalorieDifference / 30
        const dailyCalorieTarget : number = maintenanceCalorieIntake + dailyCalorieDifference
        
        setUserDailyCalorieTarget(dailyCalorieTarget)
    }

    // calculateDailyCalorieTarget(userBodyWeight, userMaintenanceCalories, userRateOfWeightChange)



    return ( 
        <>
        <Head>
            <title>Nutrition Tool | Maintenance Calorie Calculator</title>
            <meta />
        </Head>
        <Flex height={"50rem"} alignItems={"center"} justifyContent={"center"}>
        <Flex direction={"column"} p={10} rounded={6} position={"relative"} background={"blackAlpha.100"} alignItems={"center"}>
            <Heading mb={"5"}>Calculate Your Daily Calorie Target</Heading>
            <Flex direction={"column"} width="50%">
            <Text alignSelf={"start"} mb='8px'>Body Weight in KG:</Text>
            <Input  mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
            <Text mb='8px'>Sex:</Text>
            <Select bg='white' placeholder="Select from dropdown"  mb={3} onChange={handleUserSexChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </Select>
            <Text mb='8px'> Body Fat Percentage: </Text>
            <Input mb={3}  variant={"outlined"} value={userBodyFatPercentage} onChange={handleUserBodyFatPercentageChange}></Input>
            <Text mb='8px'>Maintenance Calories:</Text>
            <Input mb={3} variant={"outlined"} value={userMaintenanceCalories} onChange={handleUserMaintenanceCaloriesChange}></Input>
            <Text mb='8px'>Your Goal:</Text>
            <Select bg='white' placeholder="Select from dropdown"  mb={3} onChange={handleUserGoalChange}>
                <option value='Gaining'>Gain Weight</option>
                <option value='Dieting'>Lose Weight</option>
            </Select>
            <Text mb='8px'>Target Rate of Weight Change:</Text>
            <Select bg='white' placeholder="Select from dropdown" mb={3} onChange={handleUserRatesOfWeightChangeChange} whiteSpace="normal">
                {weightChangeOptionDropdown}
            </Select>
            </Flex>
            <Divider mb={"3"} mt={"3"} orientation='horizontal' />
            <Heading mb={"3"} size='lg'> Results</Heading>
            <Text fontSize='lg'> Your Daily Calorie Target is: {userDailyCalorieTarget}kcal</Text>
            {/* <Text fontSize='lg'> Your target monthly weight change is: {} kcal</Text> */}


        </Flex>
        
        </Flex>
        </>
     );
}
 


export default DailyCalorieCalculator;