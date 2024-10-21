import PageLayout from "../../layouts/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import {getManagerDataM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Managers = () => {
    const [managerData, setManagerData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const managers = await getManagerDataM();
                setManagerData(managers);
            } catch (error) {
                console.error(error);
                // Check for specific status codes
                if (error.response) {
                    const {status} = error.response;
                    if (status === 401 || status === 403) {
                        navigate('/unauthorized'); // Redirect to Unauthorized page
                    } else {
                        navigate('/database-error'); // Redirect to Database Error page
                    }
                } else {
                    // Network error or no response
                    navigate('/database-error'); // Redirect for network or unexpected errors
                }
            }
        }
        fetchData().then(() => console.log('Manager Data fetched'));
    }, [navigate]);

    return (
        <PageLayout heading={'Managers'} subHeading={'Details about Managers'}>
            <CustomTable heading={"Manager List"} data={managerData} colorSelection={"purpleAccent"} maxHeight={500}/>
        </PageLayout>
    );
}

export default Managers;
