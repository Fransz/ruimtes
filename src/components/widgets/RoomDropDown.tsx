import React from "react";
import RoomMarker from "./RoomMarker";
import DropDown, { IDropDownItem } from "./DropDown";
import useRoomContext from "../../hooks/use-room-context";
import { IRoom } from "../../context/Room";

interface IRoomItem extends IDropDownItem {
  value: IRoom;
}

interface IRoomDropDown {
  handleRoomChange: (room: IRoom) => void;
  room: IRoom;
}

const RoomDropDown = ({ handleRoomChange, room }: IRoomDropDown) => {
  const { rooms } = useRoomContext();
  const roomItems = rooms.map((r) => {
    return {
      key: r.id,
      value: r,
      label: (
        <div className='mx-auto flex items-center px-2'>
          <RoomMarker
            room={r}
            filterHandler={(e) => e}
            className='mx-1 h-4 w-4 rounded-full border'
          />
          <div>{r.name}</div>
        </div>
      ),
    };
  });

  const roomItem =
    roomItems.find((i) => i.value.id === room.id) ?? roomItems[0];
  const handleRoomItemChange = (r: IDropDownItem): void =>
    handleRoomChange((r as IRoomItem).value);

  return (
    <DropDown
      items={roomItems}
      selected={roomItem}
      setSelected={handleRoomItemChange}
    />
  );
};

export default RoomDropDown;
