import React, { useState } from 'react';
import Sound from 'react-native-sound';
import {
  mediaDevices,
  MediaStream,
  MediaStreamConstraints
} from 'react-native-webrtc';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { navigate } from '../helpers/RootNavigation';
import { MainContext as MainContextType, User } from '../interfaces';
import { addcallloading } from '../redux/reducer';
const initialValues: MainContextType = {
  username: '',
  peerId: '',
  users: [],
  localStream: null,
  remoteStream: null,
  remoteUser: null,
  setActiveCall: null,
  socket2: null,
  tokenmessage: null,
  socketDoctorId: null,
  settokenmessage: () => { },
  setsocketDoctorId: () => { },
  setSocket2: () => { },
  initialize: () => { },
  setUsername: () => { },
  setPeerServer: () => { },
  call: () => { },
  switchCamera: () => { },
  toggleMute: () => { },
  isMuted: false,
  closeCall: () => { },
  reset: () => { },
  test: () => { },
  activeCall: null,
};

export const MainContext = React.createContext(initialValues);

interface Props { }

const MainContextProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(initialValues.username);
  const [peerId, setPeerId] = useState(initialValues.peerId);
  const [users, setUsers] = useState<User[]>(initialValues.users);
  const [localStream, setLocalStream] = useState<MediaStream | null>(
    initialValues.localStream,
  );
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(
    initialValues.remoteStream,
  );
  const [remoteUser, setRemoteUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [socket2, setSocket2] = useState<SocketIOClient.Socket | null>(null);
  const [peerServer, setPeerServer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(initialValues.isMuted);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [tokenmessage, settokenmessage] = useState<any>(null);
  const [socketDoctorId, setsocketDoctorId] = useState<any>(null);
  const outgoingCall = new Sound(require('../../src/sounds/calling.mp3'));
  const initialize = async () => {

    const isFrontCamera = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFrontCamera ? 'front' : 'environment';
    const videoSourceId = devices.find(
      (device: any) => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFrontCamera ? 'user' : 'environment';
    const constraints: MediaStreamConstraints = {
      audio: true,
      video:
      {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
          minFrameRate: 22,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };

    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream as MediaStream);
  };

  React.useEffect(() => {
    console.log(tokenmessage, "tokenmessage", socketDoctorId, "socketDoctorId")
  }, [tokenmessage, socketDoctorId]);
  const test = async () => {

    const isFrontCamera = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFrontCamera ? 'front' : 'environment';
    const videoSourceId = devices.find(
      (device: any) => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFrontCamera ? 'user' : 'environment';
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: false,
    };

    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream as MediaStream);

  }
  const call = (user: User) => {
    setRemoteUser(user);

    try {
      const call = peerServer.call(user.peerId, localStream);

      call.on(
        'stream',
        (stream: MediaStream) => {
          setActiveCall(call);
          setRemoteStream(stream);
          console.log('remote stream', stream);
        },
        (err: Error) => {
          console.error('Failed to get call stream', err);
        },
      );
    } catch (error) {
      console.log('Calling error', error);
    }
  };

  const switchCamera = () => {
    if (localStream) {
      // @ts-ignore
      localStream.getVideoTracks().forEach((track) => track._switchCamera());
    }
  };

  const toggleMute = () => {
    if (localStream)
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
  };
  const realease = () => {
    (localStream as MediaStream)
      .getVideoTracks()
      // @ts-ignore
      .forEach((track: MediaStreamTrack) => track.stop());
  };

  const closeCall = () => {
    console.log("closing", activeCall)
    if (activeCall) {
      console.log("closed", activeCall)
      activeCall.close();
    }
    dispatch(
      addcallloading({
        active: false,
        answer: false,
        video: false,
      }),
    );
    if (socket2) {
      console.log(socket2, "if check ", tokenmessage, "socketDoctorId", socketDoctorId)
      socket2.emit("close-call", {
        token: tokenmessage, socketDoctorId: socketDoctorId,
      })
    }

    if (localStream) {
      localStream.getVideoTracks().forEach((track) => track.stop());
      localStream.release();
    }
    // realease()
    // setActiveCall(null);
    setRemoteUser(null);
    navigate("ChatWindow");
    // Alert.alert('Call is ended');
  };

  const reset = async () => {
    peerServer?.destroy();
    socket?.disconnect();
    setActiveCall(null);
    setRemoteUser(null);
    setLocalStream(null);
    setRemoteStream(null);
    setUsername('');
    setPeerId('');
  };

  return (
    <MainContext.Provider
      value={{
        username,
        setUsername,
        peerId,
        setPeerId,
        users,
        setUsers,
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        initialize,
        setPeerServer,
        setActiveCall,
        socket2,
        setSocket2,
        test,
        call,
        switchCamera,
        toggleMute,
        isMuted,
        closeCall,
        reset,
        remoteUser,
        activeCall,
        tokenmessage,
        socketDoctorId,
        settokenmessage,
        setsocketDoctorId,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
