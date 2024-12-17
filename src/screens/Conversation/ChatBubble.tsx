import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { ChatMessage } from "react-native-agora-chat";
import { AppColors } from "../../constants/colors";
import { UserType } from "../../types/users";
import {getScreenWidth} from "../../constants/dimens.ts";
import {useNavigation} from "@react-navigation/native";
import MaterialIcon from "../../components/MaterialIcon.tsx";

const ChatBubble = ({myId, msg }: {myId?:string, msg: ChatMessage }) => {
    const nav = useNavigation();
    const isMe = msg.from === myId;
    const containerStyle = isMe ? style.myBubbleContainer : style.otherBubbleContainer;
    const bubbleStyle = isMe ? style.mybubble : style.otherbubble;

    const viewImage = ()=>{
        console.log(msg)
        const url = msg.body.remotePath;
        const width = msg.body.height;
        const height = msg.body.width;
        const aspectRatio = height/width;
        nav.navigate('ImageView', {
                url, aspectRatio
        })

    };
    const imagePath = msg?.body?.remotePath?.length > 5 ? msg.body?.remotePath : msg.body.localPath;
    const isRead = msg?.hasRead;
    console.log(msg)
    return (<View style={containerStyle}>
            <View style={bubbleStyle}>
                {
                    msg.body.type === 'img' ?
                        <Pressable onPress={viewImage}>
                            <Image
                                source={{
                                    uri: imagePath,
                                    width: getScreenWidth() * 0.5,
                                    height:200,}}
                                style={{
                                    borderRadius:10,
                                    marginBottom:2
                                }}
                            />
                        </Pressable>
                        : <Text>{msg.body.content} </Text>

                }
            <View style={commonStyle.timeContainer}>
            <Text style={commonStyle.time}> {dateFormat(msg.localTime)}</Text>
                {isMe &&  <MaterialIcon icon='check-all' size={15} color={isRead ? AppColors.seenCheckBlue : AppColors.lightGrey}/>}
            </View>
            <View style={commonStyle.timeSpace}></View>
            
        </View></View>
    );
}

export default ChatBubble;

const commonStyle = StyleSheet.create({
    bubbleContainer: {
        flexDirection: 'row',
       
    },
    bubble: {
        paddingHorizontal: 10,
        paddingVertical: 10, 
        marginBottom: 5,
        minWidth: '20%',
        maxWidth: '75%',
         position:'relative'
    },
    timeSpace: {
        height:6, width:10
    },
    timeContainer: {
        position: 'absolute',
        right: 5,
        bottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        color: AppColors.lightGrey,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight:2,
    }
});

const style = StyleSheet.create({
   
    myBubbleContainer: {
        ...commonStyle.bubbleContainer,
        justifyContent: 'flex-end',
    },
    otherBubbleContainer: {
        ...commonStyle.bubbleContainer,
        justifyContent: 'flex-start',
    },
    mybubble: {
       ...commonStyle.bubble,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 20,
        marginRight:10,
        backgroundColor: AppColors.myBubbleBg
    },
    otherbubble: {
        ...commonStyle.bubble,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 20,
        marginLeft:10,
        backgroundColor: AppColors.white
    }
});


const dateFormat = (timeStamp: number) => {
    const date = new Date(timeStamp);

const hours = date.getHours();
const minutes = date.getMinutes();
const period = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
const formattedHours = hours % 12 || 12; // Handle 0 as 12
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const time = `${formattedHours}:${formattedMinutes} ${period}`;

    return time;
}