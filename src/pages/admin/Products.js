import PageLayout from "../../layouts/PageLayout";
import {getProductCategories, getProducts, getProductDetails, getProductSales} from "../../services/apiService";
import Grid from "@mui/material/Grid2";
import CustomGrayCard from "../../components/CustomGrayCard";
import {FormControl, InputLabel, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Products() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [categories, setCategories] = useState([
        {
            "category": "All"
        }
    ]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([
        {"id": 1, "name": "Product 1", "category": "Category 1", "price": 100, "stock": 10},
    ]);
    const [selectedProduct, setSelectedProduct] = useState(1);
    const [productData, setProductData] = useState([
        {"id": 0, "name": "Select A Product", "category": "Category", "price": 0.0}
    ]);
    const [revenueData, setRevenueData] = useState([]);

    // Calculate Y-axis domain based on revenue data
    const getYAxisDomain = () => {
        if (!revenueData || revenueData.length === 0) return [0, 100];

        const minRevenue = Math.min(...revenueData.map(d => d.TotalRevenue));
        const maxRevenue = Math.max(...revenueData.map(d => d.TotalRevenue));

        // Add 10% padding to the top and bottom
        const padding = (maxRevenue - minRevenue) * 0.1;
        return [
            Math.max(0, minRevenue - padding), // Don't go below 0
            maxRevenue + padding
        ];
    };

    useEffect(() => {
        getProductCategories()
            .then((response) => {
                setCategories([
                    ...categories,
                    ...response
                ]);
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    const {status} = error.response;
                    if (status === 401 || status === 403) {
                        navigate('/unauthorized');
                    } else {
                        navigate('/database-error');
                    }
                } else {
                    navigate('/database-error');
                }
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getProducts(selectedCategory);
                setProducts(products);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    const {status} = error.response;
                    if (status === 401 || status === 403) {
                        navigate('/unauthorized');
                    } else {
                        navigate('/database-error');
                    }
                } else {
                    navigate('/database-error');
                }
            }
        }

        fetchData().then(() => console.log('Products Data fetched'));
    }, [selectedCategory]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetails = await getProductDetails(selectedProduct);
                const productSales = await getProductSales(selectedProduct);
                setProductData(productDetails);
                setRevenueData(productSales);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    const {status} = error.response;
                    if (status === 401 || status === 403) {
                        navigate('/unauthorized');
                    } else {
                        navigate('/database-error');
                    }
                } else {
                    navigate('/database-error');
                }
            }
        }
        fetchData().then(() => console.log('Product Details fetched'));
    }, [selectedProduct]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);
    }

    return (
        <PageLayout title="Products" subHeading={"Details of products and sales"}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <CustomGrayCard>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <FormControl sx={{minWidth: 500, borderRadius: 10}}>
                                    <InputLabel
                                        id="Category-select-label"
                                        sx={{
                                            color: colors.cyanAccent[500],
                                            '&.Mui-focused': {color: colors.cyanAccent[500]}
                                        }}
                                    >
                                        Select Category
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="Category-select-label"
                                        id="Category-select"
                                        value={selectedCategory || ""}
                                        label="Select Category"
                                        onChange={handleCategoryChange}
                                        sx={{
                                            outlineColor: colors.cyanAccent[500],
                                            backgroundColor: colors.cyanAccent[900],
                                            color: colors.cyanAccent[500],
                                            '& .MuiSelect-icon': {color: colors.cyanAccent[500]},
                                            '&:hover': {backgroundColor: colors.cyanAccent[900]},
                                        }}
                                    >
                                        {categories.length > 0 ? (
                                            categories.map((Category) => (
                                                <MenuItem
                                                    key={Category.category}
                                                    value={Category.category}
                                                    sx={{
                                                        backgroundColor: colors.grey[800],
                                                        '&:hover': {backgroundColor: colors.cyanAccent[800]},
                                                    }}
                                                >
                                                    {Category.category}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>
                                                No Categorys Available
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Typography>Click a product for more details</Typography>
                            <Grid size={12}>
                                <ProductsTable
                                    data={products}
                                    colorSelection={'cyanAccent'}
                                    heading={'Products'}
                                    maxHeight={500}
                                    onRowClick={(id) => {
                                        setSelectedProduct(id);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CustomGrayCard>
                </Grid>
                <Grid size={12}>
                    <CustomGrayCard>
                        <Typography variant="h4" color="text.primary" gutterBottom>
                            Sales
                        </Typography>
                        <div>
                            <Typography variant="h4" gutterBottom>
                                Product Information
                            </Typography>
                            <Card sx={{mb: 4, backgroundColor: colors.cyanAccent["900"]}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Product ID: {productData[0].id}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Name: {productData[0].name}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Category: {productData[0].category}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Price: ${productData[0].price}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Typography variant="h4" gutterBottom>
                                Revenue Over Quarters
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={revenueData}
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="Quarter"/>
                                    <YAxis
                                        domain={getYAxisDomain()}
                                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                                    />
                                    <Legend/>
                                    <Line
                                        type="monotone"
                                        dataKey="TotalRevenue"
                                        stroke={colors.cyanAccent["500"]}
                                        activeDot={{r: 8}}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CustomGrayCard>
                </Grid>
            </Grid>
        </PageLayout>
    );
}