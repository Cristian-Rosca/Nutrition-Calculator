import Head from "next/head";
import {Flex , Heading, Input, Divider, Text, Select} from "@chakra-ui/react"
import React, { useEffect } from "react";

const MaintenanceCaloriesCalculator = () => {

    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    const handleUserBodyWeightChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserBodyWeight(Number(e.target.value))
    
    const [userHeightInCM, setUserHeightInCM] = React.useState<number>(0)
    const handleUserHeightChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserHeightInCM(Number(e.target.value))
    
    const [userAge, setUserAge] = React.useState<number>(0)
    const handleUserAgeChange = (e : React.ChangeEvent<HTMLInputElement>) => setUserAge(Number(e.target.value))

    const [userSex, setUserSex] = React.useState<string>('')
    const handleUserSexChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserSex(e.target.value)
    
    const [userPhysicalActivityLevel, setUserPhysicalActivityLevel] = React.useState<number>(0)
    const handleUserPhysicalActivityLevelChange = (e : React.ChangeEvent<HTMLSelectElement>) => setUserPhysicalActivityLevel(Number(e.target.value))
    
    const [userRMR, setUserRMR] = React.useState<number>(0)
    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)

    useEffect(() => {
            setUserRMR(calculateRMR(userSex, userBodyWeight, userHeightInCM, userAge))
    }, [userBodyWeight, userHeightInCM, userAge, userSex, userPhysicalActivityLevel]);
    
    useEffect(() => {
            setUserMaintenanceCalories(calculateMaintenanceCalories(userRMR, userPhysicalActivityLevel))
    }, [userRMR, userPhysicalActivityLevel]);
    

    // useEffect(() => {
    //     console.log("BW:", userBodyWeight);
    // }, [userBodyWeight]);
    
    // useEffect(() => {
    //     console.log("Height:", userHeightInCM);
    // }, [userHeightInCM]);
    
    // useEffect(() => {
    //     console.log("Age:", userAge);
    // }, [userAge]);
    
    // useEffect(() => {
    //     console.log("Height:", userSex);
    // }, [userSex]);


    
    return ( 
        <>
        <Head>
            <title>Nutrition Tool | Maintenance Calorie Calculator</title>
            <meta />
        </Head>
        <Flex height={"50rem"} alignItems={"center"} justifyContent={"center"}>
        <Flex direction={"column"} p={10} rounded={6} position={"relative"} background={"blackAlpha.100"} alignItems={"center"}>
            <Heading mb={"5"}>Calculate Your Maintenance Calories</Heading>
            <Flex direction={"column"} width="50%">
            <Text alignSelf={"start"} mb='8px'>Body Weight in KG:</Text>
            <Input  mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
            <Text mb='8px'>Height in CM:</Text>
            <Input mb={3}  variant={"outlined"} value={userHeightInCM} onChange={handleUserHeightChange}></Input>
            <Text mb='8px'>Age:</Text>
            <Input mb={3} variant={"outlined"} value={userAge} onChange={handleUserAgeChange}></Input>
            <Text mb='8px'>Sex:</Text>
            <Select bg='white' placeholder="Select from dropdown"  mb={3} onChange={handleUserSexChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </Select>
            <Text mb='8px'>Physical Activity Level:</Text>
            <Select minHeight={"4rem"} bg='white' placeholder="Select from dropdown" mb={3} onChange={handleUserPhysicalActivityLevelChange} whiteSpace="normal">
                <option value='1'>I am sedentary and resistance train 3-6 days per week</option>
                <option value='2'>I am lightly active and resistance train 3-6 days per week</option>
                <option value='3'>I am relatively active and resistance train 3-6 days per week</option>
                <option value='4'>I am very active and resistance train 3-6 days per week</option>
            </Select>
            </Flex>
            <Divider mb={"3"} mt={"3"} orientation='horizontal' />
            <Heading mb={"3"} size='lg'> Results</Heading>
            <Text fontSize='lg'> Your Estimated Resting Metabolic Rate is: {userRMR}kcal</Text>
            <Text fontSize='lg'> Your Estimated Maintenance Calories intake is: {userMaintenanceCalories}kcal</Text>


        </Flex>
        
        </Flex>
        </>
     );
}
 
function calculateRMR(sex: string, bodyWeight: number, heightInCM: number, age : number){
    let genderConst : number = 0
    let RMR : number
    
    if (sex === "Male"){
        genderConst = 5
    }
    else if (sex === "Female"){
        genderConst = -161
    }



    RMR = (bodyWeight * 10) + (6.25 * heightInCM) - (5 * age) + genderConst
    return Math.floor(RMR)
}

function calculateMaintenanceCalories(RMR : number, physicalActivityLevel : number){
    let activityMultiplier : number = 1
    let maintenanceCalories: number

    if (physicalActivityLevel === 1){
        activityMultiplier = 1.45
    }
    else if (physicalActivityLevel === 2){
        activityMultiplier = 1.65
    }
    else if(physicalActivityLevel === 3){
        activityMultiplier = 1.935
    }
    else if (physicalActivityLevel === 4){
        activityMultiplier = 2.05
    }

    maintenanceCalories = RMR * activityMultiplier
    return Math.floor(maintenanceCalories)
}

export default MaintenanceCaloriesCalculator;