import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1>Home Page</h1>
            <button onClick={() => navigate("/about")} className="bg-blue-500 text-white p-2 rounded">
                Go to About
            </button>
        </div>
    );
}

