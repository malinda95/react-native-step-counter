import React, {useState } from "react";

import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import {

 StyleSheet,

 Text,

 View,

 Button

} from "react-native";

import { Pedometer } from "expo-sensors";

export default function App() {

 const [PedometerAvailability, SetPedometerAvailability] = useState("");

 const [StepCount, SetStepCount] = useState(0);

 const [PermissionStatus, SetPermissionStatus] = useState(null);

 const [StoredSteps, SetStoredSteps] = useState(0);

 React.useEffect(() => {

  checkLocationPermission();
   subscribe();

 }, []);

 
 const checkLocationPermission = async () => {
  const status = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
  
  if (status === RESULTS.GRANTED) {
    SetPermissionStatus('Granted');
  } else if (status === RESULTS.DENIED) {
    SetPermissionStatus('Denied');
  }
};

 subscribe = () => {

  Pedometer.watchStepCount((result) => {

    SetStepCount(result.steps - StoredSteps);

  });

  Pedometer.isAvailableAsync().then(

  (result) => {

    SetPedometerAvailability(String(result));

  },

  (error) => {

    SetPedometerAvailability(error);

  }

  );

 };

 onPressReset = () => {
  SetStoredSteps(StepCount);
  SetStepCount(0);
 };

 return (

   <View style={styles.container}>
       <View style={{ flex: 1, justifyContent: "center" }}>

        <Text style={styles.headingDesign}>

          Permission : {PermissionStatus}

        </Text>

         <Text style={styles.headingDesign}>

           Pedometer Available : {PedometerAvailability}

         </Text>

         <Text style={styles.headingDesign}>

          Steps :{StepCount}

         </Text>

         <Button
          onPress={onPressReset}
          title="RESET"
          color="#841584"
          accessibilityLabel="Reset"
        />

       </View>
   </View>

 );

}

const styles = StyleSheet.create({

 container: {

   flex: 1,

   backgroundColor: "pink",

 },

 headingDesign: {

   backgroundColor: "yellow",

   alignSelf: "center",

   fontSize: 20,

   color: "black",

   fontWeight: "bold",

   fontFamily: "Papyrus",

   padding: 20,
   
   marginVertical: 10
 }
});