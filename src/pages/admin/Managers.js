import PageLayout from "../../layouts/admin/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";
import {getManagerData} from "../../services/apiService";
import {useEffect, useState} from "react";


const Managers = () => {
    const [managerData, setManagerData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const managers = await getManagerData();
            setManagerData(managers);
        }
        fetchData().then(() => console.log('Manager Data fetched'));
    }, []);

    return (
        <PageLayout heading={'Managers'} subHeading={'Details about Managers'}>
            <CustomTable heading={"Manager List"} data={managerData} colorSelection={"purpleAccent"} maxHeight={500}/>
        </PageLayout>
    );
}

export default Managers;
