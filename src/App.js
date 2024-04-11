import { useState } from "react";
import Calender from "./Calender";
import {
  TodaysDate,
  fourteenDays,
  CountSlotDays,
  minMaxDates,
} from "./Functions";

function App() {
  const [dates, setDates] = useState({
    activateDate: "",
    activateTime: "",
    deactivateDate: "",
    deactivateTime: "",
  });

  const [payload, setPayload] = useState({
    start_date: "",
    end_date: "",
    datesArray: [],
  });

  let today = TodaysDate();

  // sets payload (start & end ) date
  function handleStartEnd(e) {

    const [maxDate, minDate] =
      payload.datesArray.length > 0
        ? minMaxDates(payload.datesArray)
        : [false, false];

    if (minDate && e.target.id === "start_date" && minDate < e.target.value) {
      alert(
        `Minimum activation date in your list is ${minDate} select start date that includes this date `
      );
      e.target.blur();
      return;
    }
    if (maxDate && e.target.id === "end_date" && maxDate > e.target.value) {
      alert(
        `Maximum deactivation date in your list is ${maxDate} select end date that includes this date `
      );
      e.target.blur();
      return;
    }
    
    setPayload({ ...payload, [e.target.id]: e.target.value });
    e.target.blur();
  }

  // sets dates (activation & deactivation)
  function handleDates(e) {
    let max_date = fourteenDays(e.target.value, payload.end_date);
    if (e.target.id === "activate") {
      setDates({
        ...dates,
        activateDate: e.target.value,
        activateTime:
          e.target.value === today
            ? new Date().toLocaleTimeString()
            : "12:00:00 AM",
        deactivateDate: max_date,
        deactivateTime: "11:59:00 PM",
      });
    } else {
      setDates({ ...dates, deactivateDate: e.target.value });
    }
    e.target.blur();
  }

  // adds dates to the payload datesArray
  function handleAddBtn() {
    if (dates.activateDate === "" || dates.deactivateDate === "") return;
    const list = [
      ...payload.datesArray,
      {
        actDate: dates.activateDate,
        actTime: dates.activateTime,
        deacDate: dates.deactivateDate,
        deacTime: dates.deactivateTime,
      },
    ];
    setPayload({ ...payload, datesArray: list });
    setDates({
      activateDate: "",
      activateTime: "",
      deactivateDate: "",
      deactivateTime: "",
    });
    alert("Added");
  }

  // updates datesArray of payload
  function handlePayloadArray(e, index) {
    const updateList = [...payload.datesArray];
    updateList[index] =
      e.target.id === "activate"
        ? { ...updateList[index], actDate: e.target.value }
        : { ...updateList[index], deacDate: e.target.value };

    setPayload({ ...payload, datesArray: updateList });
  }

  return (
    <div className="App">
      <div>
        <div className="container-one">
          <Calender
            label="Start Date"
            id="start_date"
            min={today}
            max={payload.end_date !== "" ? payload.end_date : ""}
            value={payload.start_date}
            onChange={(e) => handleStartEnd(e)}
          />

          <Calender
            label="End Date"
            id="end_date"
            min={payload.start_date === "" ? today : payload.start_date}
            value={payload.end_date}
            onChange={(e) => handleStartEnd(e)}
            isDisabled={payload.start_date === "" ? true : false}
          />
        </div>

        <div className="container-two">
          <Calender
            label="Activation Date"
            id="activate"
            min={payload.start_date}
            max={payload.end_date}
            value={dates.activateDate}
            time={dates.activateTime}
            onChange={handleDates}
            isDisabled={
              payload.start_date === "" || payload.end_date === ""
                ? true
                : false
            }
          />

          <Calender
            label="Deactivation Date"
            id="deactivate"
            min={dates.activateDate}
            max={fourteenDays(dates.activateDate, payload.end_date)}
            value={dates.deactivateDate}
            time={dates.deactivateTime}
            onChange={handleDates}
            isDisabled={dates.activateDate === "" ? true : false}
          />
        </div>
        {dates.activateDate !== "" && (
          <p style={{ color: "green", textAlign: "center" }}>
            Number of days :{" "}
            {CountSlotDays(dates.activateDate, dates.deactivateDate)} Days
          </p>
        )}

        <button
          style={{ width: "300px", marginLeft: "30px" }}
          onClick={handleAddBtn}
        >
          Add
        </button>
      </div>
      <div className="container-three">
        {payload.datesArray.map((data, index) => (
          <div key={index} className="container-one">
            <Calender
              label="Activation Date"
              id="activate"
              min={payload.start_date}
              max={data.deacDate}
              value={data.actDate}
              time={data.actTime}
              onChange={(e) => handlePayloadArray(e, index)}
            />

            <Calender
              label="Deactivation Date"
              id="deactivate"
              value={data.deacDate}
              min={data.actDate}
              max={fourteenDays(data.actDate, payload.end_date)}
              time={data.deacTime}
              onChange={(e) => handlePayloadArray(e, index)}
            />
          </div>
        ))}
        {payload.datesArray.length !== 0 ? (
          <button
            style={{ width: "300px", marginLeft: "30px" }}
            onClick={() => {
              alert("submitted");
              console.log(payload);
            }}
          >
            Submit
          </button>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

export default App;
