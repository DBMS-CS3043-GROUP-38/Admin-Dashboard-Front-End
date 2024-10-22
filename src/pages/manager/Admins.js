import PageLayout from "../../layouts/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import {getAdminDataM} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Admins = () => {
    const [managerData, setManagerData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const managers = await getAdminDataM();
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
        <PageLayout heading={'Admins'} subHeading={'Details about Admins'}>
            <CustomTable heading={"Admin List"} data={managerData} colorSelection={"purpleAccent"} maxHeight={500}/>
        </PageLayout>
    );
}

export default Admins;
