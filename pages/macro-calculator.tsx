import { Box, Button, Divider, Heading, Input, Select, Text, Flex, Stat, StatNumber, StatHelpText } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

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
        if (userBodyWeight !== 0 && userDailyCalorieTarget !== 0 && userGoal != '') {
            calculateMacroRecommendations(userDailyCalorieTarget, userBodyWeight, userProteinPerKG, userPercentageOfFats, userFibrePer1000kcal, userGoal)
        }

    }, [userBodyWeight, userDailyCalorieTarget, userGoal, userProteinPerKG, userPercentageOfFats, userFibrePer1000kcal]);

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
        }
    })



    useEffect(() => {
        const data = window.localStorage.getItem('User');
        if (data) {
            let lsUser = JSON.parse(data)
            setUser(lsUser)
            setUserBodyWeight(Number(lsUser.stats.userBodyWeight))
            setUserGoal(lsUser.stats.userGoal)
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
        userHeightInCM: user.stats.userHeightInCM,
        userAge: user.stats.userAge,
        userSex: user.stats.userSex,
        userPhysicalActivityLevel: user.stats.userPhysicalActivityLevel,
        userRMR: user.stats.userRMR,
        userMaintenanceCalories: user.stats.userMaintenanceCalories,
        userBodyFatPercentage: user.stats.userBodyFatPercentage
    }


    useEffect(() => {
        user.stats = userStats
        window.localStorage.setItem('User', JSON.stringify(user));
    }, [userStats]);

    const router = useRouter()

    const steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Step 4' }
    ];


    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 2,
    })

    function handlePrevClick() {
        prevStep
        router.push('/daily-calorie-calculator')
    }

    function handleNextClick() {
        nextStep
        router.push('/refeed-calculator')
    }


    


    const [chartData, setChartData] = React.useState<any>({
        labels: [
            'Protein',
            'Carbs',
            'Fats'
        ],
        datasets: [{
            data: [ (userProteinTarget * 4 / userDailyCalorieTarget) * 100, (userCarbTarget * 4 / userDailyCalorieTarget) * 100, (userFatTarget * 9 / userDailyCalorieTarget) * 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    })

    useEffect(() => {
        setChartData({
            labels: [
                'Protein',
                'Carbs',
                'Fats'
            ],
            datasets: [{
                data: [ (userProteinTarget * 4 / userDailyCalorieTarget) * 100, (userCarbTarget * 4 / userDailyCalorieTarget) * 100, (userFatTarget * 9 / userDailyCalorieTarget) * 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        })
    }, [userProteinTarget, userCarbTarget, userFatTarget]);


    return (
        <>
            <Head>
                <title>Nutrition Tool | Maintenance Calculator</title>
                <meta />
            </Head>

            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} mt={"3rem"}>
                    <Heading color={"white"} mb={"5"}>Calculate Daily Macro Target</Heading>
                </Box>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} my={"2rem"}>
                    {/*  Inputs  */}
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} flex={1} alignItems={"center"} ml={"10rem"}>

                        <Box display={"flex"} flexDirection={"column"} width={"17rem"}>
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
                    </Box>


                    {/*  Outputs  */}
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} flex={1} mr={"10rem"}>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'xl'} mt={"2rem"} textAlign={"center"}>{userDailyCalorieTarget} kcal 🎯</Heading>
                            </Box>
                        </Box>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Protein 🍗</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userProteinTarget} g</StatNumber>

                                    </Stat>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Carbs 🍚</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userCarbTarget} g</StatNumber>
                                    </Stat>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Fats 🥑</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userFatTarget} g</StatNumber>
                                    </Stat>
                                </Box>
                            </Box>

                        </Box>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Fibre 🍞</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userFibreTarget}g</StatNumber>

                                    </Stat>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Fluids ☕️</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userFluidTarget}l</StatNumber>
                                    </Stat>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} >
                                <Heading color={"white"} size={'lg'} mt={"2rem"} textAlign={"center"}>Fruit & Veg 🥝</Heading>
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} height={"auto"} width={"12rem"} mt={"1rem"} >
                                    <Stat bg={"white"} rounded={20}>
                                        <StatNumber fontSize={"35"} textAlign={"center"}>{userFruitTarget} of each</StatNumber>

                                    </Stat>
                                </Box>
                            </Box>
                        </Box>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} my={"2rem"} >
                            <Chart
                                type="doughnut"
                                data={chartData}
                                width={"200px"}
                                height={"200px"}
                                options={{
                                    maintainAspectRatio: false, 
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: "bottom",
                                            labels: {
                                                color: 'white',
                                                padding: 30
                                            }
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(context) {
                                                    let label = context.dataset.label || '';
                            
                                                    if (label) {
                                                        label += ': ';
                                                    }
                                                    if (context.parsed !== null) {
                                                        label += new Intl.NumberFormat('default', {
                                                            style: 'percent',
                                                          }).format(context.parsed / 100);
                                                    }
                                                    return label;
                                                }

                                               
                                                  }
                                            }
                                        }



                                    }

                                }
                                
                            />
                        </Box>




                    </Box>
                </Box>


                {/*  Steps  */}
                <Box display={"flex"} justifyContent={"center"}>
                    <Box display={"flex"} flexDirection="column" width="50%" justifyContent={"flex-start"} >
                        <Box display={"flex"} justifyContent={"center"}>
                            <Steps activeStep={activeStep} >
                                {steps.map(({ label }) => (
                                    <Step label={label} key={label}>

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
                                    onClick={handlePrevClick}
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

export default MacroCalculator;