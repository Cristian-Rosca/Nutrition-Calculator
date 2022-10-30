import Head from "next/head";
import { Flex, Heading, Input, Divider, Text, Select, Box, Stat, StatLabel, StatNumber, StatHelpText, Button, color } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';

const MaintenanceCaloriesCalculator = () => {

    const router = useRouter()

    const [userBodyWeight, setUserBodyWeight] = React.useState<number>(0)
    const handleUserBodyWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserBodyWeight(Number(e.target.value))

    const [userHeightInCM, setUserHeightInCM] = React.useState<number>(0)
    const handleUserHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserHeightInCM(Number(e.target.value))

    const [userAge, setUserAge] = React.useState<number>(0)
    const handleUserAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserAge(Number(e.target.value))

    const [userSex, setUserSex] = React.useState<string>('')
    const handleUserSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserSex(e.target.value)

    const [userPhysicalActivityLevel, setUserPhysicalActivityLevel] = React.useState<number>(0)
    const handleUserPhysicalActivityLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserPhysicalActivityLevel(Number(e.target.value))

    const [userRMR, setUserRMR] = React.useState<number>(0)
    const [userMaintenanceCalories, setUserMaintenanceCalories] = React.useState<number>(0)

    const steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Step 4' }
    ];

    
        const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
            initialStep: 0,
        })
        

        useEffect(() => {
            setUserRMR(calculateRMR(userSex, userBodyWeight, userHeightInCM, userAge))
        }, [userBodyWeight, userHeightInCM, userAge, userSex, userPhysicalActivityLevel]);

        useEffect(() => {
            setUserMaintenanceCalories(calculateMaintenanceCalories(userRMR, userPhysicalActivityLevel))
        }, [userRMR, userPhysicalActivityLevel]);

        function calculateRMR(sex: string, bodyWeight: number, heightInCM: number, age: number) {
            let genderConst: number = 0
            let RMR: number

            if (sex === "Male") {
                genderConst = 5
            }
            else if (sex === "Female") {
                genderConst = -161
            }

            RMR = (bodyWeight * 10) + (6.25 * heightInCM) - (5 * age) + genderConst
            return Math.floor(RMR)
        }

        function calculateMaintenanceCalories(RMR: number, physicalActivityLevel: number) {
            let activityMultiplier: number = 1
            let maintenanceCalories: number

            if (physicalActivityLevel === 1) {
                activityMultiplier = 1.45
            }
            else if (physicalActivityLevel === 2) {
                activityMultiplier = 1.65
            }
            else if (physicalActivityLevel === 3) {
                activityMultiplier = 1.935
            }
            else if (physicalActivityLevel === 4) {
                activityMultiplier = 2.05
            }

            maintenanceCalories = RMR * activityMultiplier
            return Math.floor(maintenanceCalories)
        }


        interface User {
            stats: {
                userBodyWeight: number,
                userHeightInCM: number,
                userAge: number,
                userSex: string,
                userPhysicalActivityLevel: number,
                userRMR: number,
                userMaintenanceCalories: number
                userBodyFatPercentage: number
            },
            targets: {
                userRateOfWeightChange: number,
                userDailyCalorieTarget : number,
                userGoal: string, 
                userProteinTarget: number,
                userCarbTarget: number,
                userFatTarget: number, 
                userFibreTarget: number,
                userFluidTarget: number,
                userFruitTarget: number,
                userVegTarget: number
            },
            preferences: {
                userProteinPerKG: number,
                userPercentageOfFats: number,
                userFibrePer1000kcal: number
            }
        }

        const [user, setUser] = React.useState<User>({
            stats: {
                userBodyWeight: 0,
                userHeightInCM: 0,
                userAge: 0,
                userSex: '',
                userPhysicalActivityLevel: 0,
                userRMR: 0,
                userMaintenanceCalories: 0,
                userBodyFatPercentage: 0
            },
            targets: {
                userRateOfWeightChange: 0,
                userDailyCalorieTarget : 0,
                userGoal: '', 
                userProteinTarget: 0,
                userCarbTarget: 0,
                userFatTarget: 0, 
                userFibreTarget: 0,
                userFluidTarget: 0,
                userFruitTarget: 0,
                userVegTarget: 0
            },
            preferences: {
                userProteinPerKG: 2.2,
                userPercentageOfFats: 0.25,
                userFibrePer1000kcal: 14
            }
        })





        useEffect(() => {
            const data = window.localStorage.getItem('User');
            if (data) {
                let lsUser = JSON.parse(data)
                setUser(lsUser)
                setUserBodyWeight(Number(lsUser.stats.userBodyWeight))
                setUserHeightInCM(lsUser.stats.userHeightInCM)
                setUserAge(lsUser.stats.userAge)
                setUserSex(lsUser.stats.userSex)
                setUserPhysicalActivityLevel(lsUser.stats.userPhysicalActivityLevel)
                lsUser.stats.userRMR ? setUserRMR(lsUser.stats.userRMR) : ""
                lsUser.stats.userMaintenanceCalories ? setUserRMR(lsUser.stats.userMaintenanceCalories) : ""
            }
        }, []);

        interface Stats {
            userBodyWeight: number,
            userHeightInCM: number,
            userAge: number,
            userSex: string,
            userPhysicalActivityLevel: number,
            userRMR: number,
            userMaintenanceCalories: number
            userBodyFatPercentage: number
        }


        const userStats: Stats = {
            userBodyWeight: userBodyWeight,
            userHeightInCM: userHeightInCM,
            userAge: userAge,
            userSex: userSex,
            userPhysicalActivityLevel: userPhysicalActivityLevel,
            userRMR: userRMR,
            userMaintenanceCalories: userMaintenanceCalories,
            userBodyFatPercentage: user.stats.userBodyFatPercentage
        }


        useEffect(() => {
            user.stats = userStats
            window.localStorage.setItem('User', JSON.stringify(user));
        }, [userStats]);


        function handleNextClick() {
            nextStep
            router.push('/daily-calorie-calculator')
        }



        return (
            <>
                <Head>
                    <title>Nutrition Tool | Maintenance Calorie Calculator</title>
                    <meta />
                </Head>

                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} >
                        <Heading color={"white"} mb={"5"}>Calculate Your Maintenance Calories </Heading>
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} mt={"2rem"} mb={"2rem"}>
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} flex={1} alignItems={"center"} ml={"10rem"}>
                            <Box  display={"flex"} flexDirection={"column"} width={"17rem"}>
                                <Text color={"white"} mb='8px'>Body Weight in KG:</Text>
                                <Input rounded={8} mb={3} variant={"outlined"} value={userBodyWeight} onChange={handleUserBodyWeightChange} ></Input>
                                <Text color={"white"} mb='8px'>Height in CM:</Text>
                                <Input rounded={8} mb={3} variant={"outlined"} value={userHeightInCM} onChange={handleUserHeightChange}></Input>
                                <Text color={"white"} mb='8px'>Age:</Text>
                                <Input rounded={8} mb={3} variant={"outlined"} value={userAge} onChange={handleUserAgeChange}></Input>
                                <Text color={"white"} mb='8px'>Sex:</Text>
                                <Select rounded={8} bg='white' mb={3} placeholder={"Select from dropdown"} value={userSex} onChange={handleUserSexChange}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
                                <Text color={"white"} mb='8px'>Physical Activity Level:</Text>
                                <Select rounded={12} minHeight={"4rem"} bg='white' placeholder={"Select from dropdown"} value={userPhysicalActivityLevel} mb={3} onChange={handleUserPhysicalActivityLevelChange} whiteSpace="normal">
                                    <option value='1'>I am sedentary and resistance train 3-6 days per week</option>
                                    <option value='2'>I am lightly active and resistance train 3-6 days per week</option>
                                    <option value='3'>I am relatively active and resistance train 3-6 days per week</option>
                                    <option value='4'>I am very active and resistance train 3-6 days per week</option>
                                </Select>
                                </Box>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} flex={1} mr={"10rem"}>

                            <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Maintenance Calorie Intake ⚡️</Heading>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                <Stat bg={"white"} rounded={20}>
                                    <StatNumber fontSize={"35"} textAlign={"center"}>{userMaintenanceCalories}</StatNumber>
                                    <StatHelpText fontSize={"28"} textAlign={"center"}>kcal</StatHelpText>
                                </Stat>
                            </Box>
                            <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Maintenance RMR 😴 </Heading>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"}>
                                <Stat bg={"white"} rounded={20}>
                                    <StatNumber fontSize={"35"} textAlign={"center"}>{userRMR}</StatNumber>
                                    <StatHelpText fontSize={"28"} textAlign={"center"}>kcal</StatHelpText>
                                </Stat>
                            </Box>



                        </Box>
                    </Box>
                    <Box display={"flex"} justifyContent={"center"}>
                    <Box display={"flex"} flexDirection="column" width="50%" justifyContent={"flex-start"} >
                        <Box display={"flex"} justifyContent={"center"}>
                        <Steps activeStep={activeStep} >
                            {steps.map(({ label}) => (
                                <Step  label={label} key={label}>
                                    
                                </Step>
                            ))}
                        </Steps>
                        </Box>
                        {activeStep === steps.length ? (
                            <Box display={"flex"} p={4}>
                                <Button bg={"white"} mx="auto" size="sm" onClick={reset}>
                                    Reset
                                </Button>
                            </Box>
                        ) : (
                            <Box display={"flex"} justifyContent={"end"} m={5}>
                                <Button
                                    bg={"white"}
                                    isDisabled={activeStep === 0}
                                    mr={2}
                                    onClick={prevStep}
                                    size="sm"
                                    variant="ghost"
                                >
                                    Prev
                                </Button>
                                <Button size="sm" onClick={handleNextClick}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        )}
                    </Box>
                    </Box>
                </Box>

            </>
        );
    }



    export default MaintenanceCaloriesCalculator;