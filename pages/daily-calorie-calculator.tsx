import React, { useEffect } from "react";
import { Box, Button, Divider, Flex, Heading, Input, Select, Text, } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import bodyFatGuide from "../public/body-fat-guide.png"

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

    const [displayBodyFatGuide, setDisplayBodyFatGuide] = React.useState<boolean>(false)


    function handleToggleBodyFatGuideClick () {
        if (displayBodyFatGuide == false){
            setDisplayBodyFatGuide(true)
        }
        else {
            setDisplayBodyFatGuide(false)
        }
    }

    const weightChangeLegend = {
        "slowGain" : {label : "Gain 0.5% of your body weight per month (Advanced Trainees)", value : 0.005},
        "mediumGain" : {label : "Gain 1% of your body weight per month (Intermediate Trainees)", value : 0.01},
        "fastGain" : {label : "Gain 1.5% of your body weight per month (Beginner Trainees)", value : 0.015},
        "slowDiet" : {label : "Lose 2% of your body weight per month", value : -0.02},
        "mediumDiet" : {label : "Lose 3% of your body weight per month", value : -0.03},
        "fastDiet" : {label : "Lose 4% of your body weight per month", value : -0.04}
    }

    function findAvailableUserRatesOfWeightChange(sex: string, goal : string, bodyFatPercentage: number) {
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

    

    useEffect(() => {
        if (userSex != '' && userGoal == 'Gaining') {    
            findAvailableUserRatesOfWeightChange(userSex, userGoal, userBodyFatPercentage)
        }
        
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
        
    }, [availableUserRatesOfWeightChange]);
    

    useEffect(() => {
        if (userBodyWeight != 0 && userMaintenanceCalories != 0){
            if (userRateOfWeightChange === 0){
                setUserDailyCalorieTarget(0)
            }
            else{
                calculateDailyCalorieTarget(userBodyWeight, userMaintenanceCalories, userRateOfWeightChange)
            }
        }  
    }, [userBodyWeight, userMaintenanceCalories, userRateOfWeightChange]);
    
    function calculateDailyCalorieTarget(bodyWeightInKG: number, maintenanceCalorieIntake: number, rateOfWeightChange: number){
        const kcalsPerKG : number = 7700
        const goalWeightChange : number = bodyWeightInKG * rateOfWeightChange
        const monthlyCalorieDifference : number = goalWeightChange * kcalsPerKG
        const dailyCalorieDifference : number = monthlyCalorieDifference / 28
        const dailyCalorieTarget : number = maintenanceCalorieIntake + dailyCalorieDifference
        
        setUserDailyCalorieTarget(Math.floor(dailyCalorieTarget))
    }

    


    return ( 
        <>
        <Head>
            <title>Nutrition Tool | Maintenance Calorie Calculator</title>
            <meta />
        </Head>
        <Box display={"flex"} height={"50rem"} justifyContent={"center"} >
        <Box display={"flex"} flexDirection={"column"} p={10} rounded={6} position={"relative"} alignItems={"center"}>
            <Heading color={"white"} mb={"5"}>Calculate Your Daily Calorie Target</Heading>
            <Box display={"flex"} flexDirection={"column"} width="50%">
            <Text color={"white"} alignSelf={"start"} mb='8px'>Body Weight in KG:</Text>
            <Input  mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
            <Text color={"white"} mb='8px'>Sex:</Text>
            <Select bg='white' placeholder="Select from dropdown"  mb={3} onChange={handleUserSexChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </Select>
            <Text color={"white"} mb='8px'> Body Fat Percentage: </Text>
            <Input mb={3}  variant={"outlined"} value={userBodyFatPercentage} onChange={handleUserBodyFatPercentageChange}></Input>
                <Button mb={3} justifyContent={"center"} variant={"link"} onClick={handleToggleBodyFatGuideClick} fontSize='sm'> {displayBodyFatGuide ? "Hide body fat guide" : "Click to show body fat guide"} </Button>
            </Box>
            {displayBodyFatGuide ? <Box mb={3} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                 <Image src={bodyFatGuide} width={"950px"} height={"225px"}/> 
            </Box>  : "" } 
            <Box display={"flex"} flexDirection={"column"} width="50%">
            <Text color={"white"} mb='8px'>Maintenance Calories:</Text>
            <Input mb={3} variant={"outlined"} value={userMaintenanceCalories} onChange={handleUserMaintenanceCaloriesChange}></Input>
            <Text color={"white"} mb='8px'>Your Goal:</Text>
            <Select bg='white' placeholder="Select from dropdown"  mb={3} onChange={handleUserGoalChange}>
                <option value='Gaining'>Lean Gaining</option>
                <option value='Dieting'>Dieting</option>
            </Select>
            <Text color={"white"} mb='8px'>Target Rate of Weight Change:</Text>
            <Select bg='white' placeholder="Select from dropdown" mb={3} onChange={handleUserRatesOfWeightChangeChange} whiteSpace="normal">
                {weightChangeOptionDropdown}
            </Select>
            </Box>
            <Box display={"flex"} flexDirection={"column"} width="50%" alignItems={"center"}>
            <Divider mb={"3"} mt={"3"} orientation='horizontal' />
            <Heading color={"white"} mb={"3"} size='lg'> Results</Heading>
            <Text color={"white"} fontSize='lg'> Your Daily Calorie Target is: {userDailyCalorieTarget}kcal</Text>
            {/* <Text fontSize='lg'> Your target monthly weight change is: {} kcal</Text> */}
            <Divider mb={"3"} mt={"3"} orientation='horizontal' />
            </Box>


        </Box>
        </Box>
        
        
        </>
     );
}
 


export default DailyCalorieCalculator;