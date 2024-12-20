import PageLayout from "../../layouts/PageLayout";
import ScheduledTrains from "../../components/ScheduledTrains";
import {Box} from "@mui/material";
import ScheduleTrainsButton from "../../components/ScheduleTrainsButton";
import { CustomTable } from "../../components/OrderDetailsTable";
import Grid from "@mui/material/Grid2";
import {getScheduledTrains, getWeeklyTrains, scheduleTrains} from "../../services/apiService";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ScheduleTrain() {
    const [weeklyTrainData, setWeeklyTrainData] = useState([]);
    const [scheduledTrains, setScheduledTrains] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weeklyTrains = await getWeeklyTrains();
                const scheduledTrains = await getScheduledTrains();

                setScheduledTrains(scheduledTrains);
                setWeeklyTrainData(weeklyTrains);
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

        fetchData().then(r => console.log('Data fetched'));
    }, [navigate])

    const handleScheduleTrains = async () => {
        // Call the scheduleTrains function
        let response;

        try {
            response = await scheduleTrains();
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
        return response;
    };


    return (

        <PageLayout heading={"Schedule Train"} subHeading={"Schedule a new train"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomTable data={weeklyTrainData} colorSelection={'purpleAccent'} heading={'Weekly Trains'} maxHeight={500}/>
                </Grid>

                <Box sx={{display: 'flex', width: '100%', alignContent: 'center', justifyContent: 'center'}}>
                    <ScheduleTrainsButton onSchedule={handleScheduleTrains}/>
                </Box>

                <Grid size={12}>
                    <ScheduledTrains heading={"Scheduled Trains"} colorSelection={'purpleAccent'} maxHeight={600}
                                     data={scheduledTrains}/>
                </Grid>
            </Grid>
        </PageLayout>
    );
}

const scheduledTrains = [
    {
        id: "T001",
        destination: "New York",
        capacityFilled: 75,
        fullCapacity: 100,
        time: "2024-10-12T08:30:00Z"
    },
    {
        id: "T002",
        destination: "Los Angeles",
        capacityFilled: 50,
        fullCapacity: 120,
        time: "2024-10-12T12:00:00Z"
    },
    {
        id: "T003",
        destination: "Chicago",
        capacityFilled: 90,
        fullCapacity: 150,
        time: "2024-10-12T15:45:00Z"
    },
    {
        id: "T004",
        destination: "Houston",
        capacityFilled: 60,
        fullCapacity: 110,
        time: "2024-10-12T17:30:00Z"
    },
    {
        id: "T005",
        destination: "Phoenix",
        capacityFilled: 80,
        fullCapacity: 130,
        time: "2024-10-12T19:00:00Z"
    },
    {
        id: "T006",
        destination: "Philadelphia",
        capacityFilled: 65,
        fullCapacity: 140,
        time: "2024-10-12T21:15:00Z"
    },
    {
        id: "T007",
        destination: "San Antonio",
        capacityFilled: 40,
        fullCapacity: 90,
        time: "2024-10-12T23:00:00Z"
    },
    {
        id: "T008",
        destination: "San Diego",
        capacityFilled: 55,
        fullCapacity: 100,
        time: "2024-10-13T01:45:00Z"
    },
    {
        id: "T009",
        destination: "Dallas",
        capacityFilled: 85,
        fullCapacity: 120,
        time: "2024-10-13T03:30:00Z"
    },
    {
        id: "T010",
        destination: "San Jose",
        capacityFilled: 45,
        fullCapacity: 110,
        time: "2024-10-13T06:00:00Z"
    }
];

const weeklyTrainData = [
    {
        id: 'T001',
        dayOfWeek: 'Monday',
        time: '08:30 AM',
        maxCapacity: 500,
        destinationCity: 'New York'
    },
    {
        id: 'T002',
        dayOfWeek: 'Tuesday',
        time: '10:00 AM',
        maxCapacity: 450,
        destinationCity: 'Los Angeles'
    },
    {
        id: 'T003',
        dayOfWeek: 'Wednesday',
        time: '12:15 PM',
        maxCapacity: 600,
        destinationCity: 'Chicago'
    },
    {
        id: 'T004',
        dayOfWeek: 'Thursday',
        time: '03:45 PM',
        maxCapacity: 550,
        destinationCity: 'Houston'
    },
    {
        id: 'T005',
        dayOfWeek: 'Friday',
        time: '06:00 PM',
        maxCapacity: 400,
        destinationCity: 'Miami'
    },
    {
        id: 'T006',
        dayOfWeek: 'Saturday',
        time: '09:30 AM',
        maxCapacity: 480,
        destinationCity: 'Phoenix'
    },
    {
        id: 'T007',
        dayOfWeek: 'Sunday',
        time: '11:00 AM',
        maxCapacity: 500,
        destinationCity: 'San Francisco'
    }
];
