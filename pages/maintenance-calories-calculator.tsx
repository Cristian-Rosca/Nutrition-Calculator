import Head from "next/head";
import {Flex , Heading, Input, Divider, Text, Select, Box} from "@chakra-ui/react"
import React, { useEffect } from "react";
import DailyCalorieCalculator from "./daily-calorie-calculator";

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

    // localStorage 
    useEffect(() => {
        const userBodyWeight = window.localStorage.getItem('userBodyWeight');
        if ( userBodyWeight !== null ) setUserBodyWeight(JSON.parse(userBodyWeight));

        const userHeightInCM = window.localStorage.getItem('userHeightInCM');
        if ( userHeightInCM !== null ) setUserHeightInCM(JSON.parse(userHeightInCM));
        
        const userAge = window.localStorage.getItem('userAge');
        if ( userAge !== null ) setUserAge(JSON.parse(userAge));
        
        const userSex = window.localStorage.getItem('userSex');
        if ( userSex !== null ) setUserSex(JSON.parse(userSex));
        
        const userPhysicalActivityLevel = window.localStorage.getItem('userPhysicalActivityLevel');
        if ( userPhysicalActivityLevel !== null ) setUserPhysicalActivityLevel(JSON.parse(userPhysicalActivityLevel));
        
        const userRMR = window.localStorage.getItem('userRMR');
        if ( userRMR !== null ) setUserRMR(JSON.parse(userRMR));
        
        const userMaintenanceCalories = window.localStorage.getItem('userMaintenanceCalories');
        if ( userMaintenanceCalories !== null ) setUserMaintenanceCalories(JSON.parse(userMaintenanceCalories));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('userBodyWeight', JSON.stringify(userBodyWeight));
      }, [userBodyWeight]);

      useEffect(() => {
        window.localStorage.setItem('userHeightInCM', JSON.stringify(userHeightInCM));
      }, [userHeightInCM]);
    
      useEffect(() => {
        window.localStorage.setItem('userAge', JSON.stringify(userAge));
      }, [userAge]);

      useEffect(() => {
        window.localStorage.setItem('userSex', JSON.stringify(userSex));
      }, [userSex]);
    
      useEffect(() => {
        window.localStorage.setItem('userPhysicalActivityLevel', JSON.stringify(userPhysicalActivityLevel));
      }, [userPhysicalActivityLevel]);

      useEffect(() => {
        window.localStorage.setItem('userRMR', JSON.stringify(userRMR));
      }, [userRMR]);

      useEffect(() => {
        window.localStorage.setItem('userMaintenanceCalories', JSON.stringify(userMaintenanceCalories));
      }, [userMaintenanceCalories]);
      

    return ( 
        <>
        <Head>
            <title>Nutrition Tool | Maintenance Calorie Calculator</title>
            <meta />
        </Head>
        <Box display={"flex"} height={"50rem"}  justifyContent={"center"}>
        <Box display={"flex"} flexDirection={"column"} p={10} rounded={6} position={"relative"} alignItems={"center"}>
            <Heading color={"white"}mb={"5"}>Calculate Your Maintenance Calories</Heading>
            <Box display={"flex"} flexDirection={"column"} width="50%">
            <Text color={"white"} alignSelf={"start"} mb='8px'>Body Weight in KG:</Text>
            <Input  mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
            <Text color={"white"} mb='8px'>Height in CM:</Text>
            <Input mb={3}  variant={"outlined"} value={userHeightInCM} onChange={handleUserHeightChange}></Input>
            <Text color={"white"} mb='8px'>Age:</Text>
            <Input mb={3} variant={"outlined"} value={userAge} onChange={handleUserAgeChange}></Input>
            <Text color={"white"} mb='8px'>Sex:</Text>
            <Select bg='white' mb={3} placeholder={"Select from dropdown"} value={userSex} onChange={handleUserSexChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </Select>
            <Text color={"white"} mb='8px'>Physical Activity Level:</Text>
            <Select minHeight={"4rem"} bg='white' placeholder={"Select from dropdown"} value={userPhysicalActivityLevel} mb={3} onChange={handleUserPhysicalActivityLevelChange} whiteSpace="normal">
                <option value='1'>I am sedentary and resistance train 3-6 days per week</option>
                <option value='2'>I am lightly active and resistance train 3-6 days per week</option>
                <option value='3'>I am relatively active and resistance train 3-6 days per week</option>
                <option value='4'>I am very active and resistance train 3-6 days per week</option>
            </Select>
            </Box>
            <Divider width={"50%"} mb={"3"} mt={"3"} orientation='horizontal' />
            <Heading color={"white"} mb={"3"} size='lg'> Results</Heading>
            <Text color={"white"} fontSize='lg'> Your Estimated Resting Metabolic Rate is: {userRMR}kcal</Text>
            <Text color={"white"} fontSize='lg'> Your Estimated Maintenance Calories intake is: {userMaintenanceCalories}kcal</Text>
            <Divider width={"50%"} mb={"3"} mt={"5"} orientation='horizontal' />


        </Box>
        
        </Box>
        </>
     );
}
 


export default MaintenanceCaloriesCalculator;