import ImageListItem from "./imageListItem";

const ImageList = ({ imageList, handleLoadImage, activeImage }) => {
  return (
    <>
      <div
        className="px-2"
        style={{
          backgroundColor: "#F2F4F4",
          width: "250px",
          overflowY: "scroll",
        }}
      >
        {imageList.map((imageData) => {
          return (
            <ImageListItem
              key={imageData.id}
              imageData={imageData}
              handleLoadImage={handleLoadImage}
              isActive={activeImage === imageData.imgName}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageList;
