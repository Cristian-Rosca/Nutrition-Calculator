import Link from "next/link";

const Navbar = () => {
    return ( 
        <nav>
            <div>
                <h1>Nutrition Calculator</h1>
            </div>
            <Link href="/maintenance-calories-calculator"><a>Step 1: Calculate Maintenance Calories</a></Link>
            <Link href="/"><a>Step 2: Set Rate of Progression</a></Link>
            <Link href="/"><a>Step 3: Calculate Intake Recommendation</a></Link>
            <Link href="/"><a>Step 4: Calculate Refeed Intake</a></Link>
            <Link href="/"><a>Troubleshooting Nutrition Targets</a></Link>
        </nav>

    );
}
 
export default Navbar;