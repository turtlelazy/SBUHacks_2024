import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
    return (
        <RNCamera
            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
        // Add other camera settings here
        />
    );
};

export default CameraScreen;
