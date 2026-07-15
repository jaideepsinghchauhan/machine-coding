function Interests({ interests, errors, handleChange }: any) {
  const handleInterests = (e: any) => {
    const { name, checked } = e.target;
    console.log("name", name, "value", checked);
    if (checked === false) {
      const updatedInterests = interests.filter(
        (interest: string) => interest !== name,
      );
      handleChange({ target: { name: "interests", value: updatedInterests } });
      console.log("updatedInterests if", updatedInterests);
    } else {
      const updatedInterests = [...interests, name];
      handleChange({ target: { name: "interests", value: updatedInterests } });
      console.log("updatedInterests else", updatedInterests);
    }
  };
  return (
    <div>
      <div>
        <div>
          <label>Music</label>{" "}
          <input
            type="checkbox"
            name="music"
            checked={interests.includes("music")}
            onChange={handleInterests}
          />
        </div>
        <div>
          <label>Coding</label>{" "}
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={handleInterests}
          />
        </div>
        {errors.interests && (
          <span className="form-errors">{errors.interests}</span>
        )}
      </div>
    </div>
  );
}

export default Interests;
