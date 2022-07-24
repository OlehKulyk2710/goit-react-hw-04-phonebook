import css from './Filter.module.css';

const Filter = ({ onFilterChange, filter }) => {
  const handleChange = event => {
    onFilterChange(event.currentTarget.value);
  };

  return (
    <div className={css.filter__container}>
      <p className={css.filter__title}>Find contacts by name</p>
      <label className={css.filter__label}>
        <input
          type="text"
          name="filter"
          value={filter}
          className={css.filter__input}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Filter;
