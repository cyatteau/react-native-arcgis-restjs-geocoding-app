import { React, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { geocode } from "@esri/arcgis-rest-geocoding";

const DisplayForm = () => {
  const [text, setText] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [postal, setPostal] = useState("");
  const [theCoords, setTheCoords] = useState("");
  const [theComma, setTheComma] = useState("");
  const [add, setAdd] = useState("");
  const [theAdd, setTheAdd] = useState("");

  const testAPI = () => {
    const apiKey =
      "YOUR_API_KEY";
    const authentication = ApiKeyManager.fromKey(apiKey);
    geocode({
      address: text,
      postal: postal,
      authentication,
    })
      .then((response) => {
        setLong(Math.round(response.candidates[0].location.x * 10000) / 10000);
        setLat(Math.round(response.candidates[0].location.y * 10000) / 10000);
        setAdd(response.candidates[0].address);
        setTheCoords("Coordinates: ");
        setTheComma(", ");
        setTheAdd("Address: ");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>ArcGIS Geocoding App</Text>
        <TextInput
          onChangeText={(value) => setText(value)}
          placeholder="Enter Street Address"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(stuff) => setPostal(stuff)}
          placeholder="Enter Postal Code"
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={testAPI} style={styles.press}>
          <Text style={styles.text}>Get Location Info</Text>
        </Pressable>
      </View>
      <Text style={styles.coords}>
        {theCoords}
        {long}
        {theComma}
        {lat}
      </Text>
      <Text style={styles.coords}>
        {theAdd}
        {add}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  textInput: {
    fontSize: 20,
    padding: 10,
    margin: 10,
    borderColor: "#000000",
    borderWidth: 1,
  },
  press: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "blue",
    margin: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  coords: {
    fontSize: 17,
    margin: 10,
  },
});

export default DisplayForm;
