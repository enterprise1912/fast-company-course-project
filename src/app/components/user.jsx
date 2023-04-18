import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        {<Bookmark status={bookmark} onClick={() => onToggleBookmark(_id)} />}
      </td>
      <td>
        <button className={"btn btn-danger"} onClick={() => onDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
