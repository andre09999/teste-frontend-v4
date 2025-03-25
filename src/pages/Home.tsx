import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const containerStyle = {
  width: '60vw',
  height: '60vh',
};

const Home: React.FC = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const [stateHistory, setStateHistory] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);

  useEffect(() => {
    fetch('/data/equipmentPositionHistory.json')
      .then((response) => response.json())
      .then((data) => {
        const equipment = data[0]; 
        setPositions(equipment.positions);
      });
  }, []);

  useEffect(() => {
    fetch('/data/equipmentStateHistory.json')
      .then((response) => response.json())
      .then((data) => {
        const equipmentState = data.find((item: { equipmentId: string; }) => item.equipmentId === 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9');
        if (equipmentState) {
          const latestStateId = equipmentState.states[equipmentState.states.length - 1].equipmentStateId;
          fetch('/data/equipmentState.json')
            .then((stateResponse) => stateResponse.json())
            .then((stateData) => {
              const currentStateData = stateData.find((state: { id: any; }) => state.id === latestStateId);
              if (currentStateData) {
                setCurrentState(currentStateData.name);
              }
            });
        }
      });
  }, []);

  const handleMarkerClick = (position: any) => {
    setSelectedPosition(position);

    fetch('/data/equipmentStateHistory.json')
      .then((response) => response.json())
      .then((data) => {
        const equipmentState = data.find((item: { equipmentId: string; }) => item.equipmentId === 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9');
        if (equipmentState) {
          setStateHistory(equipmentState.states);
        }
      });
  };

  const center = {
    lat: -19.126536,
    lng: -45.947756,
  };

  return (
    <div className="container mt-5" id="centralizar" style={{ width: '80vw', margin: '0 auto' }}>
      <h1 className="text-center mb-4">Sistema de Monitoramento de Equipamentos Florestais</h1>
      <p className="lead text-center">
        Este sistema permite o monitoramento das posições e estados de equipamentos utilizados em operações florestais.
        Acompanhe em tempo real as posições, estados e histórico de cada equipamento.
      </p>

      <LoadScript googleMapsApiKey="">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {positions.map((position, index) => (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lon }}
              title={`Posição: ${position.date} - Estado: ${currentState}`}
              onClick={() => handleMarkerClick(position)}
            />
          ))}

          {selectedPosition && (
            <InfoWindow
              position={{ lat: selectedPosition.lat, lng: selectedPosition.lon }}
              onCloseClick={() => setSelectedPosition(null)}
            >
              <div>
                <h3>Posição: {selectedPosition.date}</h3>
                <p><strong>Estado Atual:</strong> {currentState}</p>
                <h5>Histórico de Estados:</h5>
                <ul>
                  {stateHistory.map((state, index) => (
                    <li key={index}>
                      {new Date(state.date).toLocaleString()} - Estado: {state.equipmentStateId}
                    </li>
                  ))}
                </ul>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;
