import { Link } from "react-router-dom";
import Command from "./Command";
import close from "../assets/commands/close.svg";
import {
  commandRootStyle,
  commandCatStyle,
  commandParentStyle,
  commandCatText,
  closeStyle,
  scrollStyling,
  commandEntryStyle,
} from "../style/style";

const SelectedCommands = ({
  selectedCategoryId,
  filteredCommands,
  categories,
  loggedIn,
  token,
  fetchCategories,
}) => {
  const categoryParent = categories.map(
    (el) => el.id === selectedCategoryId && el.parent_category
  );
  const categoryName = categories.map(
    (el) => el.id === selectedCategoryId && el.category
  );

  const handleDelete = () => {
    if (loggedIn) {
      fetch(`/api/commands/${selectedCategoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong with the delete request.");
          }
        })
        .then(() => {
          fetchCategories();
          //TODO:// re route from /commands to /categories
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className={commandRootStyle}>
      <div className={commandCatStyle}>
        <p className={commandParentStyle}>{categoryParent}</p>

        {loggedIn ? (
          <Link to="/categories">
            <div
              className="text-black text-2xl font-bold absolute top-0 right-10 px-2"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => handleDelete()}
            >
              delete
            </div>
          </Link>
        ) : null}

        <Link to="/categories" className={closeStyle}>
          <img src={close} alt="close" />
        </Link>
        <p className={commandCatText}>{categoryName}</p>
        <ul className={scrollStyling}>
          {filteredCommands &&
            filteredCommands.map(
              ({ command_syntax, command_description }, index) => (
                <li key={index} className={commandEntryStyle}>
                  <Command syntax={command_syntax} />
                  <p>
                    <span className="font-bold">Description: </span>
                    {command_description}
                  </p>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default SelectedCommands;
