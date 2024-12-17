import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {pickImage} from '../../utils/pickImage.ts';
import MaterialIcon from '../../components/MaterialIcon.tsx';
import {ImagePickerResponse} from 'react-native-image-picker';
import {useCallback} from 'react';

const AttachModal = ({
  show,
  onClose,
  onAttach,
}: {
  show: boolean;
  onClose: () => void;
  onAttach: (images: ImagePickerResponse) => void;
}) => {
  const openImagePicker = useCallback(async () => {
    const resp = await pickImage();
    onAttach(resp);
  }, [onAttach]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onClose();
      }}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={openImagePicker}
            style={[styles.button, styles.imageButton]}>
            <MaterialIcon icon="image" size={30} color="#1b34b2" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AttachModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  imageButton: {
    backgroundColor: 'rgba(27, 52, 178,0.2)',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
