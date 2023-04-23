import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion";

import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { Spinner } from "../components";
import { statuses } from "../utils/styles";
import { storage } from "../config/firebase.config";
import { alertDanger, alertNull, alertSuccess } from "../context/actions/alertAction";
import { buttonClick } from "../animations";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded Successfully"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image Deleted Successfully"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };

    addNewProduct(data).then((res) => {
      dispatch(alertSuccess("New Item Added"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder="Item name here..."
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-center gap-5 mt-1 flex-wrap">
          {statuses && statuses?.map((data) => (
            <p 
              key={data.id}
              className={`px-5 py-2 rounded-md text-md text-textColor font-semibold tracking-wide cursor-pointer transition hover:shadow-md border border-gray-200 backdrop-blur-md ${data.category === category ? "bg-orange-500 text-white shadow-md" : "bg-transparent"}`}
              onClick={() => setCategory(data.category)}
            >
              {data.title}
            </p>
          ))}
        </div>

        <InputValueField
          type="number"
          placeHolder="Item price here..."
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full bg-card mt-1 backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <>
              <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                <Spinner />
                {Math.round(progress > 0) && (
                  <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-md font-medium tracking-wide text-textColor">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-textColor">
                        {Math.round(progress) > 0 && (
                          <>{`${Math.round(progress)}%`}</>
                        )}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${Math.round(progress)}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="text-5xl text-gray-400">
                          <FaCloudUploadAlt className="rotate-0" />
                        </p>
                        <p className="text-md tracking-wide text-gray-500 font-medium">Click to upload an image</p>
                      </div>
                    </div>

                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className="w-full h-full object-cover"
                    />

                    <motion.button
                      { ...buttonClick }
                      type="button"
                      className="absolute top-3 right-3 p-2 rounded-full bg-orange-500 text-lg cursor-pointer outline-none hover:shadow-md hover:brightness-110 transition-all duration-500 ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          { ...buttonClick }
          className="w-full py-2 mt-3 rounded-md bg-orange-500 text-primary shadow-md text-[14px] tracking-wide hover:brightness-90 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none placeholder:text-sm placeholder:tracking-wider placeholder:font-medium tracking-wide text-sm rounded-md border border-gray-200 focus:border-orange-500"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;