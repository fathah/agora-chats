import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { conversationStyles } from "./style";

const ChatInput = ({onDone,onClear}:{onDone: (text:string) => void, onClear: () => void}) => {
    const [input, setInput] = useState('');

    const handleTextChange = (v: string) => {
        setInput(v);
    }

    return (
<TextInput onChangeText={handleTextChange} placeholder="Enter Message"
                    value={input}
                    onEndEditing={onEndEditing}
                style={conversationStyles.chatinput}
                />
    );
}

export default ChatInput;