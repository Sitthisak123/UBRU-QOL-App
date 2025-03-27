import axios from "axios";
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Button, Text, View } from "react-native";
import cheerio from 'react-native-cheerio';
import { asyncStorage_getItem } from "@/utility/db/AsyncStorage";

const page = () => {

  const dataExtract = (strHTML) => {
    const $ = cheerio.load(strHTML, { decodeEntities: false });

    const courses = $('#dgv tr').toArray();
    if (courses.length) {
      courses.reduce((acc, row) => {
        const cells = $(row).find('td span');
        if (cells.length > 0) {
          const course = {
            term: $(cells[1]).text().trim(),
            subjectCode: $(cells[2]).text().trim(),
            subjectName: $(cells[3]).text().trim(),
            section: $(cells[4]).text().trim(),
            credits: $(cells[5]).text().trim(),
            creditFull: $(cells[6]).text().trim(),
            teacher: $(cells[7]).text().trim(),
            groupName: $(cells[8]).text().trim(),
            grade: $(cells[9]).text().trim(),
            transferExempt: $(cells[10]).text().trim(),
            answerOK: $(cells[11]).text().trim(),
          };
          acc.push(course);
        }
        return acc;
      }, []);
    } else {
      // console.log("\x1b[31m%s\x1b[0m","request ejected!!! to fix pls re-login.");
      console.warn("request ejected!!! to fix pls re-login.");
    }
    console.log(courses)
  }
  const getGrades = async () => {
    try {
      const SSID = await asyncStorage_getItem('SSID');
      const response = await axios.get(process.env.EXPO_PUBLIC_API_GRADES,
        {
          headers: {
            'SSID': SSID,
          },
        }
      );
      dataExtract(response.data);

    } catch (error) {
      console.error("Request error:", error);
    }
  };

  useEffect(() => {

  }, []);

  return (
    <View style={customStyles.view}>
      <Button onPress={getGrades} title='Test Grade' />
    </View>

  )
}
export default page;

const customStyles = {
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
};