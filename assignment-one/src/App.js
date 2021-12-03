import React, { useState }  from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";
import { addDays } from 'date-fns';
import Event from './Component/Event/Event';
import DatePicker from "./Component/DatePicker/DatePicker"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = ()=>{
      
    const [event, setEvent] = useState([]);
    const [division, setDivision] = useState("");
    const { register, handleSubmit } = useForm();
    const [showDate, setShowDate] = useState(false);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

    const {startDate, endDate} = state[0];

    console.log(typeof startDate);
    console.log("ed", endDate);

    const getEventDetails = async()=>{   
      try{

        const {data} = await axios({
          url: "https://www.gov.uk/bank-holidays.json" 
        });
        const {"england-and-wales": engWal, scotland, 'northern-ireland': northIre} = data;
        const {division:divOne, events:eventOne} = engWal;
        const {division:divTwo, events:eventTwo} = scotland;
        const {division:divThree, events:eventThree} = northIre;

     
        if(division === divOne){
          const filterEvent = eventOne.filter(event => {
            return (new Date(event.date) >= startDate.getTime() && new Date(event.date) <= endDate.getTime())
          })
          setEvent(filterEvent);
        }
        if(division === divTwo){
          const filterEvent = eventTwo.filter(event => {
            return (new Date(event.date) >= startDate.getTime() && new Date(event.date) <= endDate.getTime())
          })
          setEvent(filterEvent)
        }
        if(division === divThree){
          const filterEvent = eventThree.filter(event => {
            return (new Date(event.date) >= startDate.getTime() && new Date(event.date) <= endDate.getTime())
          })
          setEvent(filterEvent)
        }        
      }catch(err){
        console.log(err);
      }   
    }

    
    const onSubmit = async(data, evt) => {
      
      const {division} = data;
      setDivision(division);
      getEventDetails();
      setShowDate(false);

    };

    return (
      <div>
        <div>
          <div className="header d-flex justify-content-between align-items-center">
            <div className="logo">Event Details</div>
            <div className="division">{division.toUpperCase()}</div>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <select {...register("division")}>
                <option value="">Select Division...</option>
                <option value="england-and-wales">england-and-wales</option>
                <option value="scotland">scotland</option>
                <option value="northern-ireland">northern-ireland</option>
              </select>
              <div className="d-inline-block pe-4" onClick={()=>setShowDate(true)}>
                {showDate ?<DatePicker state={state} setState={setState}  />: <span className="select_date"> Select Date</span>}
              </div>
              
              <input type="submit" />
            </form>
          </div>
          <div className="content d-flex flex-wrap">
            {event.map((data, idx)=> <Event key={idx} data={data}/>)}
          </div>          
        </div>
      </div>
    )
}

export default App;