import { useState } from "react";
import { View, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Calendar } from "react-native-calendars";

// TODO:
export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [memoByDate, setMemoByDate] = useState<Record<string, string>>({});
  const [memoInput, setMemoInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setMemoInput(memoByDate[day.dateString] || "");
    setShowModal(true);
  };

  const saveMemo = () => {
    if (selectedDate) {
      setMemoByDate((prev) => ({ ...prev, [selectedDate]: memoInput }));
    }
    setShowModal(false);
  };

  const deleteMemo = () => {
    if (selectedDate) {
      setMemoByDate((prev) => {
        const copy = { ...prev };
        delete copy[selectedDate];
        return copy;
      });
    }
    setShowModal(false);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black p-4">
      <Calendar
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          todayTextColor: "#3498db",
          dayTextColor: "#222",
          monthTextColor: "#222",
          arrowColor: "#3498db",
        }}
        enableSwipeMonths={true}
        firstDay={1}
        // markedDates={markedDates}
        onDayPress={onDayPress}
      />
      <View
        style={{
          opacity: showModal ? 1 : 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0008",
          zIndex: 1,
        }}
        pointerEvents="auto"
      />
      <Modal visible={showModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: "100%",
              maxWidth: 420,
              marginBottom: 0,
              minHeight: 210,
              zIndex: 2,
            }}
          >
            <Text className="font-bold mb-2">{selectedDate} 메모</Text>
            <TextInput
              value={memoInput}
              onChangeText={setMemoInput}
              placeholder="메모를 입력하세요"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 8,
                marginBottom: 16,
              }}
              multiline
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button title="저장" onPress={saveMemo} />
              <TouchableOpacity onPress={deleteMemo}>
                <Text style={{ color: "red", marginLeft: 24 }}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={{ marginLeft: 24 }}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
