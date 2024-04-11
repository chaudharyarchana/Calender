const Calender = ({
  label,
  min,
  max,
  id,
  isDisabled,
  value,
  onChange,
  time,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="date"
        id={id}
        min={min}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
        max={max}
      />
      {id === "activate" || id === "deactivate" ? <p>Time: {time}</p> : ""}
    </div>
  );
};
export default Calender;
