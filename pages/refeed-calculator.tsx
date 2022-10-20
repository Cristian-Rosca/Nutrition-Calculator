const RefeedCalculator = () => {
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