import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { View } from "react-native";

function SubmitButton({ title, style, size }) {
  const { handleSubmit } = useFormikContext();

  return (
    <View>
      <Button title={title} style={style} size={size} onPress={handleSubmit} />
    </View>
  );
}

export default SubmitButton;
