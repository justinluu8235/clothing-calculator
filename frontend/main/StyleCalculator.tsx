import React, {useState, useEffect}from 'react'
import Stack from "@mui/material/Stack";
import { useQuery } from 'react-query'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

const PROD_URL = 'http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/app/style_calculator/'
const LOCAL_URL = 'http://127.0.0.1:8000/app/style_calculator/'
const fetchItems = async () => {
    const result = await axios.get(LOCAL_URL)
    return result.data
}

export default function StyleCalculator () {
    const {isLoading, error, data } = useQuery('style', fetchItems)
    const [selectedFabric, setSelectedFabric] = useState('')
    const [selectedQuantityRange, setSelectedQuantityRange] = useState('')
    const [selectedStyleCategory, setSelectedStyleCategory] = useState('')
    const [cost, setCost] = useState('??')
     useEffect(() => {
     if(data){
        setSelectedFabric(data['fabric_types'][0].id)
        setSelectedQuantityRange(data['quantity_ranges'][0].id)
        setSelectedStyleCategory(data['style_categories'][0].id)
     }
  }, [data]);
    const csrfTokenInput = document.getElementsByName('csrfmiddlewaretoken')[0] as HTMLInputElement;
const CSRF_TOKEN = csrfTokenInput.value;
    const handleCalculate = () => {
        const calcData = {
            'fabric_type': selectedFabric,
            'quantity_range': selectedQuantityRange,
            'style_category': selectedStyleCategory
        }
        axios.post(LOCAL_URL, calcData, {
  headers: {
    'X-CSRFToken': CSRF_TOKEN,
  },
})
        .then(response => {
            console.log('response', response)
        })
        .catch(err => {
            console.log('error', err)
        })
    }


    return (
    <Stack alignItems="center" useFlexGap gap="40px">
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
    <Select
        value={selectedFabric}
        onChange={(e) => setSelectedFabric(e.target.value)}

    >
        {data && data['fabric_types'].map((fabricType)=> {return <MenuItem value={fabricType.id}>{fabricType.label}</MenuItem>})}
    </Select>
    <FormHelperText>fabric type</FormHelperText>
    </FormControl>

    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
        value={selectedQuantityRange}
        onChange={(e) => setSelectedQuantityRange(e.target.value)}
    >
        {data && data['quantity_ranges'].map((quantityRange)=> {return <MenuItem value={quantityRange.id}>{quantityRange.label}</MenuItem>})}
    </Select>
    <FormHelperText>quantity range</FormHelperText>
    </FormControl>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
        value={selectedStyleCategory}
        onChange={(e) => setSelectedStyleCategory(e.target.value)}
    >
        {data && data['style_categories'].map((styleCategory)=> {return <MenuItem value={styleCategory.id}>{styleCategory.label}</MenuItem>})}
    </Select>
    <FormHelperText>style category</FormHelperText>
</FormControl>
    <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
    </Stack>
    )
}