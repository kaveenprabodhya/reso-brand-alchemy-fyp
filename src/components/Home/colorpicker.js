import ColorPicker from "react-pick-color";

const PickColor = ({ color, handleSetColor }) => {
  return <ColorPicker color={color} onChange={handleSetColor} />;
};

export default PickColor;
