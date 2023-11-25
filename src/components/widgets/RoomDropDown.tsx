import React from "react";
import RoomMarker from "./RoomMarker";
import DropDown, { IDropDownItem } from "./DropDown";
import { IRoom } from "../../store/room";
import { useAppSelector } from "../../hooks/use-store";
import { selectAllRooms } from "../../store/room";

interface IRoomItem extends IDropDownItem {
  value: IRoom;
}

interface IRoomDropDown {
  handleRoomChange: (room: IRoom) => void;
  selectedRoom: IRoom;
}

const RoomDropDown = ({
  handleRoomChange,
  selectedRoom: room,
}: IRoomDropDown) => {
  const rooms = useAppSelector(selectAllRooms);
  const roomItems = rooms.map((r) => {
    return {
      key: r.id,
      value: r,
      label: (
        <div className='mx-auto flex items-center px-2'>
          <RoomMarker
            room={r}
            handleClick={(e) => e}
            className='mx-1 h-4 w-4 rounded-full border'
          />
          <div>{r.name}</div>
        </div>
      ),
    };
  });

  const selectedRoomItem =
    roomItems.find((i) => i.value.id === room.id) ?? roomItems[0];
  const handleRoomItemChange = (r: IDropDownItem): void =>
    handleRoomChange((r as IRoomItem).value);

  return (
    <DropDown
      items={roomItems}
      selected={selectedRoomItem}
      setSelected={handleRoomItemChange}
    />
  );
};

export default RoomDropDown;
