import React, { Fragment, useEffect, useContext, useState, useRef } from "react";
import { View, Button, Image, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colores from "../../config/colors";
import AppButton from "./AppButton";
import { RootStoreContext } from "../data/rootStore";
import { Catlog } from "../models/catlog";
import { getToken } from "../CommonFunctions/token";
import axios from "axios";
import { ICatalogPhoto, CatalogPhoto, CatalogPhotoDeleteParm } from "../models/CatalogPhoto";
import defaultStyles from "../../config/styles"
import { observer } from "mobx-react-lite";
import UserStore from "../data/userStore";
import { useFormikContext } from "formik";

const ImageList: React.FC<{ categoryId: string, name: string, }> = ({ categoryId = "", name }) => {

    const rootStore = useContext(RootStoreContext);
    const { updatingImage, uploadPhoto, loadCategoryItem, deletePhoto }
        = rootStore.catlogStore;

    const { setFieldTouched, handleChange, errors, setFieldValue, touched, values, validateField } = useFormikContext();
    let photosInit: ICatalogPhoto[] = [];
    const [photosList, setPhotos] = useState(photosInit);

    //const [catlog, setCatlog] = useState(new Catlog());
    //const [ListView_Ref, setListView_Ref] = useState(null);

    let t: any;
    const scrollViewRef = useRef(t);


    useEffect(() => {
        debugger;
        if ((values as any)[name]) {
            setPhotos((values as any)[name]);
            //console.log(photosList);
        }

    }, [(values as any)[name]])

    const _pickImage = async () => {
        //debugger;
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                // debugger;
                //setImage(result.uri);
                //console.log(result.uri);
                uploadImage(result.uri);

            }
        } catch (e) {
            console.log(e);
        }
    };

    const uploadImage = async (localUri: string) => {
        //debugger;
        //let localUri = image;
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

        uploadPhoto(categoryId, formData).then((res) => {

            photosList.push(new CatalogPhoto(res));
            setPhotos(photosList);

            // //debugger;
            // let newCatlog = { ...catlog };
            // if (!newCatlog.photos) {
            //     newCatlog.photos = [];
            // }
            // let c = new CatalogPhoto()

            // if (!newCatlog.photos) {
            //     newCatlog.photos = [];
            // }
            // newCatlog.photos.push(new CatalogPhoto(res));
            // setCatlog(new Catlog(newCatlog));

            setTimeout(() => { scrollViewRef.current.scrollToEnd({ animated: true }); }, 200);

        });
    }

    const deleteImage = (photo: ICatalogPhoto) => {

        // photos.push(new CatalogPhoto(res));
        //     setPhotos(photos);

        //let newPhotos = photos.filter(arrayItem => arrayItem.id !== photo.id);
        setPhotos(photosList.filter(arrayItem => arrayItem.id !== photo.id));
        deletePhoto(new CatalogPhotoDeleteParm({ CatalogId: categoryId, PhotoId: photo.id }));

        // //debugger;
        // let newCatlog = { ...catlog };
        // newCatlog.photos = newCatlog.photos?.filter(arrayItem => arrayItem.id !== photo.id);
        // setCatlog(new Catlog(newCatlog));

        // let CatalogId = catlog.id ? catlog.id : "";
        // deletePhoto(new CatalogPhotoDeleteParm({ CatalogId: CatalogId, PhotoId: photo.id }));

        // // let CatalogId = catlog.id ? catlog.id : "";;
        // // deletePhoto(new CatalogPhotoDeleteParm({ CatalogId: CatalogId, PhotoId: photo.id })).then(() => {
        // //     debugger;
        // //     let newCatlog = { ...catlog };
        // //     newCatlog.photos = newCatlog.photos?.filter(arrayItem => arrayItem.id !== photo.id);
        // //     setCatlog(new Catlog(newCatlog));
        // // })

        //console.log("delete image");
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatlist}
                data={photosList}
                keyExtractor={(item) => item.id}
                numColumns={1}
                horizontal={true}
                renderItem={({ item }) => (
                    <View style={styles.view}>
                        <Image source={{ uri: item.url }} style={styles.image} />
                        <TouchableOpacity onPress={() => { deleteImage(item) }} >
                            <MaterialCommunityIcons name="delete" color={colores.primary} size={30} />
                        </TouchableOpacity>
                    </View>
                )}
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
            />


            {updatingImage ?
                (<View style={{ flexDirection: 'row', backgroundColor: colores.lightMedium, paddingLeft: 30 }}>
                    <ActivityIndicator size="small" color={colores.primary} style={{ paddingRight: 30 }} />
                    <Text style={defaultStyles.text}  >Updating image...</Text>

                </View>)
                :
                (<Text style={defaultStyles.linkButton} onPress={_pickImage} >Upload new image</Text>)
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    flatlist: {
        backgroundColor: colores.lightMedium,
    },
    image: {
        marginHorizontal: 30,
        marginVertical: 10,
        width: 100,
        height: 100
    },
    view: {
        alignItems: "center",
        marginVertical: 10,
    },
    updateMessage: {
        alignItems: "center",
        marginVertical: 10,
    },
});

export default observer(ImageList);