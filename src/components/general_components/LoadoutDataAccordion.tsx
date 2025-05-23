import EquipmentTab from '../equipment_components/EquipmentTab.tsx';
import CharacterTab from "../character_components/CharacterTab.tsx";

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InventoryTab from "../inventory_components/InventoryTab.tsx";

export default function LoadoutDataAccordion() {
  return (
      <div>
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>Equipment</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <EquipmentTab />
            </AccordionDetails>
        </Accordion>

          <Accordion>
              <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
              >
                  <Typography>Character</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <CharacterTab />
              </AccordionDetails>
          </Accordion>

          <Accordion>
              <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
              >
                  <Typography>Inventory</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <InventoryTab />
              </AccordionDetails>
          </Accordion>
      </div>
  );
}