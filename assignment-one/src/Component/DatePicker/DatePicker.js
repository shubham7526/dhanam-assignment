import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./DatePicker.css"

const CustomDateRange = (props)=>{

    const { state, setState } = props;

    
    return (
        <div className="date_picker">
            <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"
            />;
        </div>
    )
}

export default CustomDateRange;