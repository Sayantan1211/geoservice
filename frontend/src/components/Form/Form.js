import "./Form.styles.scss";

const Form = (props) => {
  return (
    <div className="location">
      <form onSubmit={props.handleSubmit} className="location__form">
        <h3>Search Location</h3>
        <input
          className="location__input location__input--outlined"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
        <button
          className={`location__btn ${
            props.loading ? "location__btn--disabled" : "location__btn--primary"
          }`}
          type="submit"
          disabled={props.loading}
        >
          SUBMIT
        </button>

        {props.error && <div className="error">{props.error}</div>}
      </form>
    </div>
  );
};

export default Form;
