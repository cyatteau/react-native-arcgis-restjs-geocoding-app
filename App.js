import { React, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { geocode } from "@esri/arcgis-rest-geocoding";

const DisplayForm = () => {
  const [text, setText] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [postal, setPostal] = useState("");
  const [theCoords, setTheCoords] = useState("");
  const [add, setAdd] = useState("");

  const testAPI = () => {
    Keyboard.dismiss();
    const apiKey = "YOUR_API_KEY";
    const authentication = ApiKeyManager.fromKey(apiKey);
    geocode({
      address: text,
      postal: postal,
      authentication,
    })
      .then((response) => {
        setLong(Math.round(response.candidates[0].location.x * 10000) / 10000);
        setLat(Math.round(response.candidates[0].location.y * 10000) / 10000);
        setAdd(`Address: ${response.candidates[0].address}`);
        setTheCoords(`Coordinates: ${long}, ${lat}`);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>ArcGIS REST JS Geocoding App</Text>
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
      <Text style={styles.coords}>{theCoords}</Text>
      <Text style={styles.coords}>{add}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    textAlign: "center",
    marginBottom: 10,
  },
  textInput: {
    fontSize: 20,
    padding: 10,
    margin: 10,
    borderColor: "#000000",
    borderWidth: 1,
    width: 300,
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
    fontSize: 20,
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
    fontSize: 20,
    margin: 10,
  },
});

export default DisplayForm;
