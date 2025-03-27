import { View, Button, StyleSheet } from "react-native";
import { Canvas, Paragraph, Circle, Fill, Text, useFont, Rect, useCanvasRef, Skia } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";



export default CanvasEditable = () => {
  const shapesList = ["Rect", "Node"];
  const [shapeChoice, setShapeChoice] = useState("");
  const [shapes, setShapes] = useState([]);
  const [previewShapes, setPreviewShapes] = useState({});

  const canvasRef = useCanvasRef();
  // The position of the ball
  const x = useSharedValue(100);
  const y = useSharedValue(100);
  const shapeColor = useSharedValue("rgba(196, 33, 33, 0.5)");

  const rectStartX = useSharedValue(0);
  const rectStartY = useSharedValue(0);
  const rectEndX = useSharedValue(0);
  const rectEndY = useSharedValue(0);
  const rectX = useSharedValue(0);
  const rectY = useSharedValue(0);
  const rectW = useSharedValue(0);
  const rectH = useSharedValue(0);

  // const fontSize = 32;
  // const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), fontSize);

  useEffect(() => {
    // console.log(previewShapes);
  }, [previewShapes]);

  const gesture = Gesture.Pan().onBegin((e) => {
    rectStartX.value = e.x;
    rectStartY.value = e.y;
  }).onChange((e) => {
    x.value = e.x;
    y.value = e.y;
    rectEndX.value = e.x;
    rectEndY.value = e.y;
    rectX.value = Math.min(rectStartX.value, rectEndX.value);
    rectY.value = Math.min(rectStartY.value, rectEndY.value);
    rectW.value = Math.abs(rectEndX.value - rectStartX.value);
    rectH.value = Math.abs(rectEndY.value - rectStartY.value);

    try {
      runOnJS(setPreviewShapes)({ x: rectX.value, y: rectY.value, w: rectW.value, h: rectH.value, cx: rectEndX.value, cy: rectEndY.value });
    } catch (error) {
      console.error(error.message);
    }

  }).onEnd((e) => {
    try {
      switch (shapeChoice) {
        case "Rect":
          return runOnJS(setShapes)([...shapes, { type: shapeChoice, x: rectX.value, y: rectY.value, w: rectW.value, h: rectH.value }]);
        case "Node":
          return runOnJS(setShapes)([...shapes, { type: shapeChoice, cx: rectEndX.value, cy: rectEndY.value }]);
        default:
          return null;
      }
    } catch (error) {
      console.error(error.message);
    }
  });

  const handleShapeChoice = useCallback((shape) => {
    setShapeChoice(shape);
    setPreviewShapes({ type: shape, x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0 });
  })

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>

        <Canvas ref={canvasRef} style={styles.canvas}>
          <Fill color="black" />
          {
            shapeChoice === "Rect" ?
              <Rect
                key={"preview"}
                x={previewShapes.x || 0}
                y={previewShapes.y || 0}
                width={previewShapes.w || 0}
                height={previewShapes.h || 0}
                color={shapeColor.value}
                strokeWidth={2}
                style="stroke"
              /> : shapeChoice === "Node" ?
                <Circle
                  key={"preview"}
                  cx={previewShapes.cx || 0}
                  cy={previewShapes.cy || 0}
                  r={10}
                  color={shapeColor.value}
                /> : null
          }
          {
            shapes.length ? shapes.map((shp, idx) => {
              switch (shp.type) {
                case "Rect":
                  console.log(shp);
                  return <Rect
                    key={idx}
                    x={shp.x}
                    y={shp.y}
                    width={shp.w}
                    height={shp.h}
                    color={shapeColor.value}
                    strokeWidth={2}
                    style="stroke" />
                case "Node":
                  return <Circle
                    key={idx}
                    cx={shp.cx}
                    cy={shp.cy}
                    r={10}
                    color={shapeColor.value}
                  />
                default:
                  return null;
              }
            }) : null
          }

        </Canvas>

      </GestureDetector>
      <View style={styles.ShapesList}>
        {
          shapesList.map((shape, idx) => <Button key={idx} style={styles.shapeBTN} onPress={() => handleShapeChoice((shape))} title={shape} />)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 10,
  },
  ShapesList: {
    flex: .5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  shapeBTN: {
  }
});
