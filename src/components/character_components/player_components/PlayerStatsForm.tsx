import useLoadoutStore from "../../../stores/LoadoutsStore.tsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PlayerStatsForm(){

    const player = useLoadoutStore(state => state.activeLoadout?.player);

    const handleInputChange = (key: string, value: number)=> {
        alert(key + value);
    }

    return (
        <Form>
            Player:
            {player && player.specials ? (
                Object.entries(player.specials).map(([key, value]) => (
                    <FormGroup as={Row} xs="auto" controlId={key} key={key}>

                        <Col><FormLabel column={"sm"}>{key.toUpperCase()}</FormLabel></Col>

                        <Col><Button onClick={() => alert(key)}>{"<"}</Button></Col>

                        <Col><FormControl type={"number"}
                            defaultValue={value}
                            onChange={(e) => handleInputChange(key, Number(e.target.value))}>
                        </FormControl></Col>

                        <Col><Button onClick={() => alert(key)}>{">"}</Button></Col>
                    </FormGroup>
                ))
            ) : (
                <p>No player data available</p>
            )}
        </Form>
    );
}