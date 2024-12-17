import {Image, Pressable, View} from "react-native";
import {getScreenWidth} from "../../../constants/dimens.ts";
import {useNavigation} from "@react-navigation/native";
import {AppColors} from "../../../constants/colors.ts";
import MaterialIcon from "../../../components/MaterialIcon.tsx";

const ImageView = () => {
    const navigation = useNavigation();
    const params = navigation.getState()!.routes[2].params;
    const imageUrl:string = params?.url;
    const aspectRatio:number = params?.aspectRatio;

const goBack = ()=>{
    navigation.goBack();
}
  return <View style={{flex: 1,
      position:'relative',
  justifyContent:'center',
      alignItems:'center',
      backgroundColor: AppColors.black
  }}>
      <Pressable style={{
          position:'absolute',
          top:25, right:25
      }}
      onPress={goBack}
      >
          <MaterialIcon icon={"close"} color={AppColors.white} size={30}/>
      </Pressable>
      <Image
      source={{
          uri: imageUrl,

      }}
      style={{
          width: getScreenWidth(),
          aspectRatio: aspectRatio,
          resizeMode:'cover'
      }}
      />
  </View>;
};

export default ImageView;