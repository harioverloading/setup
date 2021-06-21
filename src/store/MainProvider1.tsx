import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';
import socketio from 'socket.io-client';
import { MainContext as MainContextType, User } from '../interfaces';
import {
  SERVER_URL,
  PEER_SERVER_HOST,
  PEER_SERVER_PORT,
  PEER_SERVER_PATH,
} from '../server';
// @ts-ignore
import Peer from 'react-native-peerjs';
import { navigate } from '../helpers/RootNavigation';
import Sound from 'react-native-sound';
import { useDispatch } from 'react-redux';
import { addcallloading } from '../redux/reducer';
const initialValues: MainContextType = {
  username: '',
  peerId: '',
  setSocket: () => { },
  socket: null,
  users: [],
  localStream: null,
  remoteStream: null,
  remoteUser: null,
  initialize: () => { },
  setUsername: () => { },
  call: () => { },
  switchCamera: () => { },
  toggleMute: () => { },
  isMuted: false,
  closeCall: () => { },
  reset: () => { },
  test: () => { },
  setActiveCall: () => { },
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
  const [peerServer, setPeerServer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(initialValues.isMuted);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [tokenmessage, settokenmessage] = useState<any>(null);

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
    const peerServer = new Peer("abc123456",
      {
        secure: true,
        host: 'health-fine-app.herokuapp.com',
        path: '/mypeer',
        port: 443,
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
              ],
            },
          ],
        },
      }
    );
    peerServer.on('error', (err: Error) =>
      console.log('Peer server error1', err),
    );
    peerServer.on('open', (peerId: string) => {
      console.log(peerId, "test peer id")
      navigate("Call");
      setPeerServer(peerServer);
      setPeerId(peerId);
      // io.emit('set-peer-id', peerId);
    });
  };
  const test = () => {
    peerServer.on('call', (call: any) => {
      // outgoingCall.play()
      // outgoingCall.pause();
      call.answer(localStream);
      setActiveCall(call);

      console.log("call peerr server")
      navigate("Call");

      call.on('stream', (stream: MediaStream) => {
        setRemoteStream(stream);
      });

      call.on('close', () => {
        console.log("Close call from server")
        closeCall();
      });

      call.on('error', () => { });
    });
  }
  const call = (user: User) => {
    // if (!peerServer || !socket) {
    //   Alert.alert('Peer server or socket connection not found');
    //   return;
    // }

    // if (!user.peerId) {
    //   Alert.alert('User not connected to peer server');
    //   return;
    // }

    // socket.emit('call', user.username);

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

  const closeCall = () => {
    console.log("closing", activeCall)
    activeCall?.close();
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => track.stop());
    }
    setActiveCall(null);
    setRemoteUser(null);
    navigate("ChatWindow");
    peerServer?.destroy();
    setLocalStream(null);
    setRemoteStream(null);
    // Alert.alert('Call is ended');
  };

  const reset = async () => {
    console.log("reset", localStream)
    // if (localStream) {
    //   console.log("relase camera")
    // localStream.getVideoTracks().forEach((track) => track.release());
    // }
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
        setActiveCall,
        setSocket,
        socket,
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
        test,
        call,
        switchCamera,
        toggleMute,
        isMuted,
        closeCall,
        reset,
        remoteUser,
        activeCall,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
