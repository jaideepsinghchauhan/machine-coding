function Settings({ theme, handleChange }: any) {
  return (
    <div>
      <div>Theme : </div>
      <label>Dark: </label>
      <input
        type="radio"
        name="theme"
        value="dark"
        checked={theme === "dark"}
        onChange={handleChange}
      />
      <label className="pl-2">Light: </label>
      <input
        type="radio"
        name="theme"
        value="light"
        checked={theme === "light"}
        onChange={handleChange}
      />
    </div>
  );
}

export default Settings;
