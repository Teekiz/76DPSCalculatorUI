import Accordion from 'react-bootstrap/Accordion';
import EquipmentTab from '../equipment_components/EquipmentTab.tsx';
import CharacterTab from "../character_components/CharacterTab.tsx";

export default function LoadoutDataAccordion() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Equipment</Accordion.Header>
        <Accordion.Body>
          <EquipmentTab />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Character</Accordion.Header>
        <Accordion.Body>
          <CharacterTab />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}