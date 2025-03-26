import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Equipment {
  positionHistory?: { date: string; lat: number; lon: number }[];
}

const HistoryPositions: React.FC<{ selectedEquipment: Equipment }> = ({ selectedEquipment }) => {
 
  
  return (
    <div>
      <h5>Histórico de Posições:</h5>
      <div>
        {selectedEquipment?.positionHistory?.map((position: { date: string; lat: number; lon: number }, index: number) => {
          const formattedDate = new Date(position.date).toLocaleDateString();
          return (
            <div key={index}>
              <p><strong>Data:</strong> {formattedDate}</p>
              <p><strong>Latitude:</strong> {position.lat}</p>
              <p><strong>Longitude:</strong> {position.lon}</p>
              <hr/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPositions;