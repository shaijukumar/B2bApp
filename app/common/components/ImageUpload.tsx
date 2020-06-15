import React, { useState, useEffect } from "react";
import { View, Button, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { getToken } from "../CommonFunctions/token";

import axios from "axios";


const ImageUpload: React.FC<{ CatalogId: string }> = ({ CatalogId }) => {

  const [image, setImage] = useState("");

  useEffect(() => {
    getPermissionAsync();
  })

  const getPermissionAsync = async () => {
    // if (Constants.platform.ios) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (status !== "granted") {
    //     alert("Sorry, we need camera roll permissions to make this work!");
    //   }
    // }
  };

  const _pickImage = async () => {
    debugger;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        debugger;
        setImage(result.uri);
        console.log(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = () => {

    let localUri = image;
    let fileType = localUri.substring(localUri.lastIndexOf(".") + 1);

    const file = {
      uri: localUri,
      name: "image.jpg",
      type: `image/${fileType}`,
    };
    const formData = new FormData();
    formData.append("file", localUri);

    formData.append("file", file as any);

    const config = {
      headers: {
        "Content-Type":
          'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
      },
    };

    getToken().then((token) => {
      if (token) {
        debugger;
        axios
          .post(
            "/CatalogPhoto/ecc19db4-f7c8-40a4-ba22-36f52d13cf45",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((resp) => {
            debugger;
            console.log(resp);
          })
          .catch((err) => {
            debugger;
            console.log(err);
          });
      }
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={_pickImage} />
      {image != "" && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload" onPress={uploadImage} />
    </View>


  );
};

export default ImageUpload;
