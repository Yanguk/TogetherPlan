import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useState } from "react";
import { Text, View } from "react-native";

const today = toDateId(new Date());

export default function BasicCalendar() {
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <View>
      <Text>Selected date: {selectedDate}</Text>
      <Calendar
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setSelectedDate}
      />
    </View>
  );
}
