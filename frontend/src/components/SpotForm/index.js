import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotThunk, editSpotThunk, getSingleSpot } from "../../store/spots";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SpotForm.css";

const SpotForm = ({ spot, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [newUrl, setUrl] = useState({ url: "", preview: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = { ...spot, ownerId: user.id, country, lat: 88, lng: 150.595959, city, address, description, name, price, state };
    console.log(newSpot);
    if (formType === "Update your spot") {
      const newerSpot = await dispatch(editSpotThunk(newSpot));
      console.log("this is what i need", newerSpot);
      history.push(`/spots/${spot.id}`);
    } else {
      const newerSpot = await dispatch(createSpotThunk(newSpot, newUrl));
      console.log(newerSpot);
      history.push(`/spots/${newerSpot.id}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <h3>Where's your place located?</h3>
      <p>Guests will only see your exact address once they booked a reservation.</p>
      <label className="countryLabel">
        Country:
        <input placeholder="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </label>
      <label>
        Street Address:
        <input placeholder="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        City:
        <input placeholder="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        State:
        <input placeholder="STATE" type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <h3>Describe your place to guests</h3>
      <p>
        Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the
        neighborhood.
      </p>
      <label>
        <textarea
          placeholder="Please write at least 30 characters"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <h3>Create a title for your spot</h3>
      <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <label>
        <input placeholder="Name of your spot" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <h3>Set a base price for your spot</h3>
      <p>Competitve pricing can help your listing stand out and rank higher in search results</p>
      <label>
        $ <input placeholder="Price per night (USD)" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      {formType === "Create a new Spot" ? (
        <div>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            placeholder="Preview Image URL"
            type="text"
            value={newUrl.url}
            onChange={(e) => setUrl({ ...newUrl, url: e.target.value })}
          />
        </div>
      ) : null}

      <button type="submit">{formType}</button>
    </form>
  );
};

export default SpotForm;
