import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayerStatsForm from "./player_components/PlayerStatsForm.tsx";

export default function CharacterTab(){

    return (
        <>
            <Row>
                <Col><PlayerStatsForm /></Col>
            </Row>
        </>
    );
}
