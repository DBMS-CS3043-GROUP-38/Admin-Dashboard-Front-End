import PageLayout from "../../layouts/admin/PageLayout";
import {CustomTable} from "../../components/OrderDetailsTable";

const Managers = () => {
    return (
        <PageLayout heading={'Managers'} subHeading={'Details about Managers'}>
            <CustomTable heading={"Manager List"} data={managerData} colorSelection={"purpleAccent"} maxHeight={500}/>
        </PageLayout>
    );
}

export default Managers;

const managerData = [
    {EmployeeID: 1, Name: "John Doe", Store: "New York", contact: "123-456-7890", Address: "1234 Main St, New York, NY 10001"},
    {EmployeeID: 2, Name: "Jane Doe", Store: "New York", contact: "123-456-7890", Address: "1234 Main St, New York, NY 10001"},
    {EmployeeID: 3, Name: "John Smith", Store: "New York", contact: "123-456-7890", Address: "1234 Main St, New York, NY 10001"},
    {EmployeeID: 4, Name: "Jane Smith", Store: "New York", contact: "123-456-7890", Address: "1234 Main St, New York, NY 10001"},
]