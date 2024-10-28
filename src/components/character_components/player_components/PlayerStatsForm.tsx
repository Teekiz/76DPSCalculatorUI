import useLoadoutStore from "../../../stores/LoadoutsStore.tsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Specials} from "../../../interfaces/SpecialsInterface.tsx";

export default function PlayerStatsForm(){

    const player = useLoadoutStore(state => state.activeLoadout?.player);
    const specialAttributes = ["strength", "perception", "endurance", "charisma", "intelligence", "agility", "luck"];

    const handleInputChange = (key: string, value: number)=> {
        alert(key + value);
    }

    return (
        <Form>
            Player:
            {specialAttributes.map((key) => {
                const value = player?.specials?.[key as keyof Specials] ?? 1; // Default value if player.specials is null

                return ( // Add return here to render the FormGroup
                    <FormGroup as={Row} xs="auto" controlId={key} key={key} >
                        <Col xs={1} className="text-start">
                            <FormLabel column={"sm"}>{key.toUpperCase()}</FormLabel>
                        </Col>

                        <Col xs={1} className="text-center">
                            <Button variant="outline-secondary" onClick={() => alert(key)} disabled={!player}>{"<"}</Button>
                        </Col>

                        <Col xs={1} className="text-center">
                            <FormControl
                                type={"number"}
                                defaultValue={value}
                                onChange={(e) => handleInputChange(key, Number(e.target.value))}
                                disabled={!player}
                            />
                        </Col>

                        <Col xs={1} className="text-center">
                            <Button variant="outline-secondary" onClick={() => alert(key)} disabled={!player}>{">"}</Button>
                        </Col>
                    </FormGroup>
                );
            })}
        </Form>
    );
}