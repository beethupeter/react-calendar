import React, { useEffect, useState } from 'react';
import PopUp from './popup';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getCalenderDates = (date) => {
    const array = [];

    const previousStartDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    const previousLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for(let i = previousLastDate - previousStartDay ;i<= previousLastDate;i++){
        const tempDate = new Date(date.getFullYear(), date.getMonth()-1, i);
        array.push({
            "day": i,
            'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
            "is_current": false,
        });

    }
    const endDate = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDate();
    for(let i=1;i<=endDate;i++){
        const tempDate = new Date(date.getFullYear(), date.getMonth(), i);
        array.push({
            "day": i,
            'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
            "is_current": true,
        });
    }
    const nextStartDay = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay();
    const numberOfDay = 6;
    for(let i=1;i<=(numberOfDay - nextStartDay); i++){
        const tempDate = new Date(date.getFullYear(), date.getMonth()+1, i);
        array.push({
            "day": i,
            'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
            "is_current": false,
        });
    }

    const formattedArray = [];
    let tempArray = [];
    array.map((item,index) => {
        if (index % 7 === 0 && index > 0 ) {
            formattedArray.push(tempArray);
            tempArray = [];
        }
        tempArray.push(item);
        return false;
    });
    formattedArray.push(tempArray);
    return formattedArray;
};

const Calender = () => {
    const [date, setDate] = useState(new Date());
    const [dateArray, setDateArray] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [todos, setTodos] = useState({});

    console.log(dateArray);

    useEffect(() => {
        setDateArray(getCalenderDates(date));
    }, [date]);

    return  (
        <>
            <div className="flex-container" id="calander_container">
                <div className="flex-title">
                    <img 
                        className="left"
                        src="assets/images/left-arrow-black-triangular-shape.png"
                        alt="Preveous Month"
                        onClick={() => { setDate(new Date( date.getFullYear(), date.getMonth()-1,1))}}
                    />
                    <span>{ monthNames[date.getMonth()] } { date.getFullYear() }</span>
                    <img
                        className="right"
                        src="assets/images/right-arrow-black-triangle.png"
                        alt="Next Month"
                        onClick={() => { setDate(new Date( date.getFullYear(), date.getMonth()+1,1))}}
                    />
                </div>
                <div className="flex-day-heading">
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>  
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>  
                    <div>S</div>
                </div>
                <div className="items_div">
                    { dateArray.map((item, index) => (
                        <div className="flex-row" key={index}>
                            { item.map((day) =>(
                                <div
                                    key={day.date}
                                    className={day.is_current ? '' : 'outside-date'}
                                    onClick={() => {
                                        setShowPopUp(true);
                                        setSelectedDate(day.date);
                                    }}
                                >
                                    {day.day}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            { showPopUp && 
                <PopUp 
                    events={todos[selectedDate] ?? []}
                    onAdd={(item) => setTodos({
                        ...todos,
                        [selectedDate]: [
                            ...(todos[selectedDate] ?? []),
                            item,
                        ]
                    })}
                    onClose={() => setShowPopUp(false)}
                />
            }
        </>
    );

};
export default Calender;