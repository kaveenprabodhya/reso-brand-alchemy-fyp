import ImageListItem from "./imageListItem";

const ImageList = ({ imageList, handleLoadImage, activeBrandId }) => {
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
        {imageList.map((brandData) => {
          return (
            <ImageListItem
              key={brandData.id}
              brandData={brandData}
              handleLoadImage={handleLoadImage}
              isActive={activeBrandId === brandData.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageList;
