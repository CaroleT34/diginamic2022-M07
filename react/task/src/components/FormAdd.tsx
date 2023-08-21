import Data from "../services/Data";
import { useRef } from "react";
const FormAdd = (props) => {
  const input_add_ref = useRef(null);
  return (
    <form onSubmit={handleSubmit}>
    <label className="form-label">
      Description :
      <input
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
    <input type="submit" value="Créer" className="btn btn-success ms-3" />
  </form>
  );
}

export default FormAdd;