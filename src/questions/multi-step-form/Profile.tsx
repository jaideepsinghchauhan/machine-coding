function Profile({ name, email, age, errors, handleChange }: any) {
  return (
    <div>
      <div>
        <label>Name :</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          className="w-64"
        />
        {errors.name && <span className="form-errors">{errors.name}</span>}
      </div>
      <div>
        <label>Email :</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
          className="w-64"
        />
        {errors.email && <span className="form-errors">{errors.email}</span>}
      </div>
      <div>
        <label>Age :</label>
        <input
          name="age"
          type="text"
          value={age}
          onChange={handleChange}
          className="w-64"
        />
        {errors.age && <span className="form-errors">{errors.age}</span>}
      </div>
    </div>
  );
}

export default Profile;
