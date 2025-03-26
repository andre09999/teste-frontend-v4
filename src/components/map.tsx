import React from 'react';
import { useEquipmentState } from './../utils/useEquipmentState';
import { calculateProductivity, calculateGain } from '../utils/utils';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import HistoryPositions from '../components/historyPositions';
import "../styles/maps.css";

const infoMapStyle = {
  width: '100%',
  height: '300px',
};

interface EquipmentStateHistory {
  date: string;
  equipmentStateId: string;
}

interface Productivity {
  productivity: number;
  hoursWorked: number;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

interface EquipmentModel {
  id: string;
  hourlyEarnings?: { equipmentStateId: string; value: number }[];
}

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  model?: string; 
  lastState: EquipmentState;
  lastPosition?: { lat: number; lon: number }; 
  stateHistory: EquipmentStateHistory[];
  modelHourlyEarnings?: HourlyEarnings[];
  positionHistory: { lat: number; lon: number; date: string }[];
  selectedEquipment?: Equipment;
}

interface ProductivityResult {
  productivity: number;
  hoursWorked: number;
}

interface GainResult {
  totalGain: number;
}

const Map: React.FC<{ selectedEquipment: Equipment }> = ({ selectedEquipment }) => {
  const { selectedDate } = useEquipmentState();

  return (
    <div className='maps'>
      <h3>{selectedEquipment.name} ({selectedEquipment.model})</h3>
      <p><strong>Percentual de Produtividade:</strong> {calculateProductivity(selectedEquipment, selectedDate).productivity.toFixed(2)}%</p>
      <p><strong>Horas Trabalhadas:</strong> {calculateProductivity(selectedEquipment, selectedDate).hoursWorked.toFixed(2)} horas</p>
      <p><strong>Ganho Estimado:</strong> R$ {calculateGain(selectedEquipment, selectedDate).totalGain.toFixed(2)}</p>
      <p style={{ color: selectedEquipment.lastState.color }}>
        <strong>Estado Atual:</strong> {selectedEquipment.lastState.name}
      </p>

      <h5>Trajeto no Mapa:</h5>
      {selectedEquipment.lastPosition && (
        <GoogleMap mapContainerStyle={infoMapStyle} center={{ lat: selectedEquipment.lastPosition.lat, lng: selectedEquipment.lastPosition.lon }} zoom={10}>
          <Polyline
            path={selectedEquipment.positionHistory.map((pos) => ({
              lat: pos.lat,
              lng: pos.lon
            }))}
            options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
          />
        </GoogleMap>
      )}

      <HistoryPositions selectedEquipment={selectedEquipment} />
    </div>
  );
};

export default Map;
