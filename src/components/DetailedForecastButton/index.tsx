import { NavLink } from "react-router-dom";

export default function DetailedForecastButton() {
    return (
        <NavLink to={'detailedforecast'}>
            <button
                className="
                    py-4 
                    px-8 
                    rounded-full 
                    text-lg 
                    bg-white 
                    text-gray-900 
                    cursor-pointer 
                    shadow-2xl
                    hover:shadow-white/20
                "
            >
                Ver Previsão Detalhada
            </button>
        </NavLink>

    )
}